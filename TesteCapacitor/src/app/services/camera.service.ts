import { Injectable } from '@angular/core';
import { MarvinImage } from 'marvin';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx'
import { Filter, GrayScaleFilter } from '../models/filter';
import { median, average } from 'filters';
import { SensogramaService } from './sensograma.service';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  [x: string]: any;

  comp: any;
  r: any;
  g: any;
  b: any;
  //testRadioOpen: any; //variavel do Radio para dialogo
  picture: string;
  _firstImage: any;
  _originalImg: MarvinImage;  // original image
  _outputImg: MarvinImage;  // modified image by the filters
  _filters: Filter[] = [];  // filters to bind in the list
  //result1: any; //
  _currentIndicesDryCell = [];
  _currentIndicesDryCellG = [];
  _currentIndicesDryCellB = [];

  arrayMin: [];

  private _choiseMinCS: any;

  private _indicesGraphic = [];
  private _indicesGraphicG = [];
  private _indicesGraphicB = [];

  private _indicesMin = [];
  private _indicesAtuais = [];
  private _channel = 0; //variavel para o canal (R, G, B) (0, 1, 2)
  private _minHunterX: any;

  private _dadosAIM = [];
  private _dadosAIMG = [];
  private _dadosAIMB = [];

  private _minR;
  private _minG;
  private _minB;

  private _indicesMinimoR = [];
  private _indicesMinimoG = [];
  private _indicesMinimoB = [];

  private _smoothinMode = 0; //Variável de seleção de suaviação 0 = nennhum, 1 = mediana, 2 = media
  private _windowsValue: 3; //Valor da janela de suavização


  private _minimoHunter: any;
  private _assimetria: any;
  private _largura: any;

  //Arrays para armazenar as séries de assimetria e largura
  private _indicesAssimetry = [];
  private _indicesWidth = [];


  public constructor(private _cameraPreview: CameraPreview, private sensogramaService: SensogramaService) {
    this.comp = 670;
    this._channel = 0; //Setando o canal inicial Verlelho (0)
    this._choiseMinCS = 1; //1 = hunter, 2 = polynomial, 3 = centroid
    this.windowsValue = 3;
    this.smoothinMode = 0;

  }

  // picture options, opções das fotos tiradas
  private _pictureOpts: CameraPreviewPictureOptions = {
    width: window.screen.width,
    height: window.screen.height,
    quality: 70 //0=max compression, 100=max quality
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

  async startCamera() { // inicia a camera
    // console.log("Entrou na funcao");
    this.picture = null;
    //this._cameraPreview.setColorEffect(this._cameraPreview.COLOR_EFFECT.MONO);
    this._cameraPreview.startCamera(this._cameraPreviewOpts).then(
      () => {
        this.takePicture();
        //this._firstImage = this._cameraPreview.setColorEffect('mono');
      },
      (err) => {
        console.log(err)
      });
  }

  async stopCamera() {
    this.cameraPreview.stopCamera();
  }

  async takePicture() {
    //alert("TAKE PICTURE");
    //this._firstImage = this._cameraPreview.setColorEffect('mono');
    this._cameraPreview.takePicture(this._pictureOpts).then(
      (res) => {
        this.picture = 'data:image/jpeg;base64,' + res; // convertendo a imagem em data string jpeg
        this.loadImage().then(() => this.takePicture()); //quando concluir o loadimage() inicia o takePicture()
        // chama recursivamente

      },
      (err) => {
        console.log(err)
      });
  }


  async loadImage() {
    this.setupFilters();
    let self = this;
    this._originalImg = new MarvinImage();
    this._originalImg.load(this.picture, function () {
      self._outputImg = new MarvinImage(this.getWidth(), this.getHeight());
      self.itemSelected(self._filters[0]);
    });
  }

  async itemSelected(filter: Filter) {
    let img = filter.applyFilter(this._originalImg, this._outputImg);
    //const response = await
    this.getPointSpr(img);
    // console.log(response);
  }



  async setupFilters() {
    this._filters.push(new GrayScaleFilter("Gray Scale"));
  }


  async refreshCanvas(image: MarvinImage) {
    image.draw(document.getElementById("canvasFilters"));
  }



  /*FUNÇÃO QUE CALCULA OS VALORES DA CURVA SPR BASEADO NO CANAL SELECIONADO PELO USUÁRIO
    RED = 0
    GREEN = 1
    BLUE = 2

    OS VALORES SÃO ARMAZENADOS NO MESMO ARRAY, FUTURAMENTE PODE SER IMPLEMENTADO UM
    ARRAY PRA CADA CANAL
    */
  getPointSpr(image: MarvinImage) {
    let _soma = [];
    let _somaG = [];
    let _somaB = [];
    let _media = [];
    let _mediaG = [];
    let _mediaB = [];
    let _indicesMinColR = []
    let _indicesMinColG = []
    let _indicesMinColB = []

    //Percorre o array para pegar as somas dos valores por coluna
  /*   for (let i = 0; i < image.getWidth(); i++) {
      for (let j = 0; j < image.getHeight(); j++) {
        if (_soma[i] == null && _somaG[i] == null && _somaB[i] == null) {
          _soma.push(image.getIntComponent0(i, j));
          _somaG.push(image.getIntComponent1(i, j));
          _somaB.push(image.getIntComponent2(i, j));
        } else {
          //_soma[j] = _soma[j] + image.getIntComponent0(i, j);
          _soma[i] = _soma[i] + image.getIntComponent0(i, j);
          _somaG[i] = _somaG[i] + image.getIntComponent1(i, j);
          _somaB[i] = _somaB[i] + image.getIntComponent2(i, j);
        }
      }
    } */


    let v = []
    for (let j = 0; j < image.getWidth(); j++) {
      let menorR = 255;
      let menorG = 255;
      let menorB = 255;
      for (let i = 0; i < image.getHeight(); i++) {
        if(image.getIntComponent0(j, i) < menorR){
          menorR = image.getIntComponent0(j, i);
        }
        if(image.getIntComponent1(j, i) < menorG){
          menorG = image.getIntComponent1(j, i);
        }
        if(image.getIntComponent1(j, i) < menorB){
          menorB = image.getIntComponent2(j, i);
        }
      }
      _indicesMinColR.push(menorR);
      _indicesMinColG[j] = menorG;
      _indicesMinColB[j] = menorB;

    }



   /*  //Percorre o array para calcular a MÉDIA por COLUNA
    for (let i = 0; i < _soma.length; i++) {
      _media[i] = (_soma[i] / (parseInt(image.getWidth())));
      //alterei de getWidth() pra pois a lógica está errada getHeight()
      _mediaG[i] = (_somaG[i] / (parseInt(image.getWidth())));

      _mediaB[i] = (_somaB[i] / (parseInt(image.getWidth())));
    } */


    if (this._currentIndicesDryCell.length == 0) {
      //verifica se os valores de referência estão vazios e setam o vetor
      this._currentIndicesDryCell =  _indicesMinColR;
      //Seta os valores de referência
      this._currentIndicesDryCellG =  _indicesMinColG;

      this._currentIndicesDryCellB = _indicesMinColB;
    }

    let dadosAIM = [];
    let dadosAIMG = [];
    let dadosAIMB = [];
    for (let i = 0; i < this._currentIndicesDryCell.length; i++) {
      dadosAIM.push( _indicesMinColR[i] / this._currentIndicesDryCell[i]);
      dadosAIMG.push( _indicesMinColG[i] / this._currentIndicesDryCellG[i]);
      dadosAIMB.push( _indicesMinColB[i]/ this._currentIndicesDryCellB[i]);
    }


    //PROCESSO QUE VERIFICA A OPÇÃO DE SUAVIZAÇÃO ESCOLHIDA E APLICA O MÉTODO
    if (this._smoothinMode == 0) {
      this._indicesGraphic = dadosAIM;
      this._indicesGraphicG = dadosAIMG;
      this._indicesGraphiB = dadosAIMB;  //guarda os valores das imaqgem atual
      //guarda os valores das imagem atual
    } else if (this._smoothinMode == 1) {
      this._indicesGraphic = median(dadosAIM, this.windowsValue);
      this._indicesGraphicG = median(dadosAIMG, this.windowsValue);
      this._indicesGraphicB = median(dadosAIMB, this.windowsValue);
    } else if (this._smoothinMode == 2) {
      this._indicesGraphic = average(dadosAIM, this.windowsValue);
      this._indicesGraphicG = average(dadosAIMG, this.windowsValue);
      this._indicesGraphicB = average(dadosAIMB, this.windowsValue);
    }

    this._dadosAIM = dadosAIM;
    this._dadosAIMG = dadosAIMG;
    this._dadosAIMB = dadosAIMB;

    /* Este método submete os arrays de dados dos canais RGB para o serviço que verifica e calcula o mínimo */
    try {
      this.sensogramaService.calculaMin(this._choiseMinCS, this.indicesGraphic, this._indicesGraphicG , this._indicesGraphicB);
    } catch (error) {
      alert(error)
    }

    //this.sensogramaService.minimoHunter(dadosAIM);
    //this.sensogramaService.minimoPolinomial(dadosAIM);

    this._indicesMinimoR.push(parseFloat(this._minR));
    this._indicesMinimoG.push(parseFloat(this._minG));
    this._indicesMinimoB.push(parseFloat(this._minB));

    let max = 0;
    for (let j = 0; j < dadosAIM.length; j++) {
      if (max < dadosAIM[j]) {
        max = dadosAIM[j];
      }
    }
    let teta_medio = ((max + parseFloat(this.sensogramaService.minimoR)) / 2);

    let aux = 0;
    let valorCL = 0;
    let valorCR = 0;
    for (let k = 0; k < dadosAIM.length; k++) {
      if (dadosAIM[k] <= teta_medio) {
        if (aux == 0) {
          valorCL = dadosAIM[k];
          aux++;
        } else {
          valorCR = dadosAIM[k];
        }
      }
    }

    //Converte para Float e define as casas decimais das métricas
    this._largura = parseFloat("" + (valorCL - valorCR).toFixed(3));
    this._assimetria = parseFloat("" + (valorCL / valorCR).toFixed(3));


    this._indicesAssimetry.push(this._assimetria);
    this._indicesWidth.push(this._largura);
    //this._minimoHunter = parseFloat("" + min.toFixed(3));
    //this._minimoHunterX = parseFloat("" + minHunX.toFixed(1));

    // this.chartSensorgrama.series[0].addPoint([min]);
    //this._indicesMin.push(this._minimoHunterX);


  }

  normalizacao(dadosAIM: number[]) {
    let min = 255.0;
    let max = 0;
    let dados = [];
    for (let i = 0; i < dadosAIM.length; i++) {
      if (min > dadosAIM[i]) { min = dadosAIM[i]; }
      if (max < dadosAIM[i]) { max = dadosAIM[i]; }
    }

    for (let j = 0; j < dadosAIM.length; j++) {
      dados.push(((dadosAIM[j] - min) / (max - min)));
    }

    return dados;
  }

  //Atualiza os valores de DryCell
  dry() {
    this._currentIndicesDryCell = this._indicesAtuais;
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
  public get indicesMin() {
    return this._indicesMin;
  }
  public set indicesMin(value) {
    this._indicesMin = value;
  }
  public get minimoHunter(): any {
    return this._minimoHunter;
  }
  public set minimoHunter(value: any) {
    this._minimoHunter = value;
  }

  public get largura(): any { //retorna a largura/widith da onda
    return this._largura;
  }
  public set largura(value: any) {
    this._largura = value;
  }
  public get assimetria(): any {
    return this._assimetria;
  }
  public set assimetria(value: any) {
    this._assimetria = value;
  }
  public get indicesAtuais() {
    return this._indicesAtuais;
  }
  public set indicesAtuais(value) {
    this._indicesAtuais = value;
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
  public get minHunterX() {
    return this._minHunterX;
  }
  public set minHunterX(value) {
    this._minHunterX = value;
  }
  public get dadosAIM() {
    return this._dadosAIM;
  }
  public set dadosAIM(value) {
    this._dadosAIM = value;
  }
  public get choiseMinCS(): any {
    return this._choiseMinCS;
  }
  public set choiseMinCS(value: any) {
    this._choiseMinCS = value;
  }


  public get indicesAssimetry() {
    return this._indicesAssimetry;
  }
  public set indicesAssimetry(value) {
    this._indicesAssimetry = value;
  }

  public get indicesWidth() {
    return this._indicesWidth;
  }
  public set indicesWidth(value) {
    this._indicesWidth = value;
  }

}
