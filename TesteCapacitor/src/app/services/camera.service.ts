import { Injectable } from "@angular/core";
import { MarvinImage } from "marvin";
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions,
} from "@ionic-native/camera-preview/ngx";
import { Filter, GrayScaleFilter } from "../models/filter";
import { median, average } from "filters";
import { SensogramaService } from "./sensograma.service";
import { Base64 } from "js-base64";
import * as Jimp from "jimp";

@Injectable({
  providedIn: "root",
})
export class CameraService {
  [x: string]: any;

  code: string;
  myImage: Jimp;
  currentRedV: number[];
  currentGreedV: number[];
  currentBlueV: number[];

  comp: any;
  r: any;
  g: any;
  b: any;

  globalCHannelRed: number[] = [];
  globalCHannelGreen: number[] = [];
  globalCHannelBlue: number[] = [];

  nColumns: number;
  nLines: number;
  //testRadioOpen: any; //variavel do Radio para dialogo
  picture: string;

  _currentIndicesDryCell: number[] = [];
  _currentIndicesDryCellG: number[] = [];
  _currentIndicesDryCellB: number[] = [];

  private _choiseMinCS: any;

  private _indicesGraphic: number[] = [];
  private _indicesGraphicG: number[] = [];
  private _indicesGraphicB: number[] = [];

  private _indicesGraphicRMean = [];

  private _indicesGraphicGMean = [];

  private _indicesGraphicBMean = [];

  private _indicesGraphicRMedian = [];

  private _indicesGraphicGMedian = [];

  private _indicesGraphicBMedian = [];


  private _channel = 0; //variavel para o canal (R, G, B) (0, 1, 2)

  private _smoothinMode = 0; //Variável de seleção de suaviação 0 = nennhum, 1 = mediana, 2 = media
  private _windowsValue: 3; //Valor da janela de suavização

  public constructor(
    private _cameraPreview: CameraPreview,
    private sensogramaService: SensogramaService
  ) {
    this.comp = 670;
    this._channel = 0; //Setando o canal inicial Verlelho (0)
    this._choiseMinCS = 1; //1 = hunter, 2 = polynomial, 3 = centroid
    this.windowsValue = 3;
    this.smoothinMode = 0;
  }

  // picture options, opções das fotos tiradas
  private _pictureOpts: CameraPreviewPictureOptions = {
    width: 400,
    height: 400,
    quality: 35, //0=max compression, 100=max quality
  };

  private _cameraPreviewOpts: CameraPreviewOptions = {
    x: 200, //Posição em que a câmera vai aparecer
    y: 200, //Posição em que a câmera vai aparecer
    width: 70,
    height: 70,
    tapPhoto: true,
    //camera: this._cameraPreview.CAMERA_DIRECTION.FRONT,
    previewDrag: true,
    toBack: false,
    //alpha: 1
  };

  async startCamera() {
    this.picture = null;

    this._cameraPreview.startCamera(this._cameraPreviewOpts).then(
      () => {
        this.myTakePicture();
      },
      (error) => {
        alert(error);
      }
    );
  }


  async stopCamera() {
    this._cameraPreview.stopCamera();
  }

  async myTakePicture() {
    this._cameraPreview.takePicture(this._pictureOpts).then((imageData) => {
      this.picture = "data:image/jpeg;base64," + imageData;
      this.code = imageData;
      this.readImage(this._base64ToArrayBuffer(this.code));
    }),
      (err) => {
        alert(err);
      };
  }

  async readImage(encodeB64: any) {
    let width: any;
    let height: any;

    Jimp.read(encodeB64)
      .then((image) => {
        width = image.bitmap.width;
        height = image.bitmap.height;
        this.myImage = image;

        this.scanImage(this.myImage, width, height).then(() =>
          this.myTakePicture()
        );
      })
      .catch((err) => {
        alert(err);
      });

  }

  async scanImage(image: Jimp, width: number, height: number) {
    let sRed = new Array((width + 1)).join("0").split("").map(parseFloat);

    let sGreen = new Array((width + 1)).join("0").split("").map(parseFloat);
    let sBlue = new Array((width + 1)).join("0").split("").map(parseFloat);
    this.nColumns = width;
    this.nLines = height;
    this.globalCHannelRed = [];
    this.globalCHannelGreen = [];
    this.globalCHannelBlue = [];
    for (let line = 0; line < Math.round((height*0.5)); line++) {
      for (let column = 0; column < width; column++) {
        sRed[column] += Jimp.intToRGBA(image.getPixelColor(column, line)).r;
        sGreen[column] += Jimp.intToRGBA(image.getPixelColor(column, line)).g;
        sBlue[column] += Jimp.intToRGBA(image.getPixelColor(column, line)).b;

        this.globalCHannelRed.push(Jimp.intToRGBA(image.getPixelColor(column, line)).r);
        this.globalCHannelGreen.push(Jimp.intToRGBA(image.getPixelColor(column, line)).g);
        this.globalCHannelBlue.push(Jimp.intToRGBA(image.getPixelColor(column, line)).b);

      }
    }
    /*
    2  3  4
    5  6  7
    8  9  10
    */
    this.currentRedV = await sRed.map(function (value) {
      return value / width;
    });

    this.currentGreenV = await sGreen.map(function (value) {
      return value / width;
    });

    this.currentBlueV = await sBlue.map(function (value) {
      return value / width;
    });

    if (this._currentIndicesDryCell.length == 0) {
      this._currentIndicesDryCell = this.currentRedV;
      this._currentIndicesDryCellG = this.currentGreenV;
      this._currentIndicesDryCellB = this.currentBlueV;
    }

    try {
      this.calculateSPR();
    } catch (error) {
      alert(error);
    }
  }

  _base64ToArrayBuffer(base64) {;
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  calculateSPR() {


    let dateAIMR = [];
    let dateAIMG = [];
    let dateAIMB = [];

    for (let i = 0; i < this.currentRedV.length; i++) {
      dateAIMR.push(this.currentRedV[i] / this._currentIndicesDryCell[i])
      dateAIMG.push(this.currentGreenV[i] / this._currentIndicesDryCellG[i])
      dateAIMB.push(this.currentBlueV[i] / this._currentIndicesDryCellB[i])
    }

    this._indicesGraphic = dateAIMR;
    this._indicesGraphicG = dateAIMG;
    this._indicesGraphicB = dateAIMB;

    this.smoothing(this._indicesGraphic, this._indicesGraphicG, this._indicesGraphicB, this.windowsValue);

    this.callMinimunMethod();
  }

  smoothing(redSmooth: number[], greenSmooth: number[], blueSmooth: number[] , WindowsValue) {
    this._indicesGraphicRMedian = median(redSmooth, this.windowsValue);
    this._indicesGraphicGMedian = median(greenSmooth, this.windowsValue);
    this._indicesGraphicBMedian = median(blueSmooth, this.windowsValue);

    this._indicesGraphicRMean = average(redSmooth, this.windowsValue);
    this._indicesGraphicGMean = average(greenSmooth, this.windowsValue);
    this._indicesGraphicBMean = average(blueSmooth, this.windowsValue);
  }

  callMinimunMethod(  ) {
    try {
      switch (this.smoothinMode) {
        case 0:
          this.sensogramaService.calculaMin(
            this._choiseMinCS,
            this.indicesGraphic,
            this._indicesGraphicG,
            this._indicesGraphicB
          );
          break;
        case 1:
          this.sensogramaService.calculaMin(
            this._choiseMinCS,
            this.indicesGraphicRMedian,
            this._indicesGraphicGMedian,
            this._indicesGraphicBMedian
          );
          break;
        case 2:
          this.sensogramaService.calculaMin(
            this._choiseMinCS,
            this.indicesGraphicRMean,
            this._indicesGraphicGMean,
            this._indicesGraphicBMean
          );
          break;
        default:
          this.sensogramaService.calculaMin(
            this._choiseMinCS,
            this.indicesGraphic,
            this._indicesGraphicG,
            this._indicesGraphicB
          );
          break;
      }

    } catch (error) {
      alert(error);
    }
  }

  normalizacao(dadosAIM: number[]) {
    let min = 255.0;
    let max = 0;
    let dados = [];
    for (let i = 0; i < dadosAIM.length; i++) {
      if (min > dadosAIM[i]) {
        min = dadosAIM[i];
      }
      if (max < dadosAIM[i]) {
        max = dadosAIM[i];
      }
    }

    for (let j = 0; j < dadosAIM.length; j++) {
      dados.push((dadosAIM[j] - min) / (max - min));
    }

    return dados;
  }

  //Atualiza os valores de DryCell
  dry() {
    this._currentIndicesDryCell = [];
    this._currentIndicesDryCellG = [];
    this._currentIndicesDryCellB = [];
  }

  /**
   * @method verifyHideShowCam() Verifica e exibe/esconde a câmera
   * */
  async verifyHideShowCam() {
    switch (this._cameraPreviewOpts.toBack) {
      case true:
        this._cameraPreviewOpts.toBack = false;
        this._cameraPreview.show();
        break;
      case false:
        this._cameraPreviewOpts.toBack = true;
        this._cameraPreview.hide();
        break;
      default:
        break;
    }
  }

  public get indicesGraphic() {
    return this._indicesGraphic;
  }
  public set indicesGraphic(value) {
    this._indicesGraphic = value;
  }
  public get indicesGraphicG() {
    return this._indicesGraphicG;
  }
  public set indicesGraphicG(value) {
    this._indicesGraphicG = value;
  }
  public get indicesGraphicB() {
    return this._indicesGraphicB;
  }
  public set indicesGraphicB(value) {
    this._indicesGraphicB = value;
  }

  public get smoothinMode(): any {
    return this._smoothinMode;
  }
  public set smoothinMode(value: any) {
    this._smoothinMode = value;
  }

  public get channel() {
    return this._channel;
  }
  public set channel(value) {
    this._channel = value;
  }
  public get windowsValue(): any {
    return this._windowsValue;
  }
  public set windowsValue(value: any) {
    this._windowsValue = value;
  }

  public get choiseMinCS(): any {
    return this._choiseMinCS;
  }
  public set choiseMinCS(value: any) {
    this._choiseMinCS = value;
  }

  public get indicesGraphicRMedian() {
    return this._indicesGraphicRMedian;
  }
  public set indicesGraphicRMedian(value) {
    this._indicesGraphicRMedian = value;
  }
  public get indicesGraphicGMedian() {
    return this._indicesGraphicGMedian;
  }
  public set indicesGraphicGMedian(value) {
    this._indicesGraphicGMedian = value;
  }
  public get indicesGraphicBMedian() {
    return this._indicesGraphicBMedian;
  }
  public set indicesGraphicBMedian(value) {
    this._indicesGraphicBMedian = value;
  }
  public get indicesGraphicRMean() {
    return this._indicesGraphicRMean;
  }
  public set indicesGraphicRMean(value) {
    this._indicesGraphicRMean = value;
  }
  public get indicesGraphicGMean() {
    return this._indicesGraphicGMean;
  }
  public set indicesGraphicGMean(value) {
    this._indicesGraphicGMean = value;
  }
  public get indicesGraphicBMean() {
    return this._indicesGraphicBMean;
  }
  public set indicesGraphicBMean(value) {
    this._indicesGraphicBMean = value;
  }
}
