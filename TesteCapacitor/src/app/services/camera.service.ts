import { Injectable } from '@angular/core';
import { MarvinImage } from 'marvin';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx'
import { Filter, GrayScaleFilter } from '../models/filter';
import { median, average } from 'filters';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  comp : any;
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

  arrayMin: [];

  
  private _indicesGraphic = [];
  private _indicesMin = [];
  private _indicesAtuais = [];
  private _channel = 0; //variavel para o canal (R, G, B) (0, 1, 2)
  
  

  private _smoothinMode = 0; //Variável de seleção de suaviação 0 = nennhum, 1 = mediana, 2 = media
  private _windowsValue: 3; //Valor da janela de suavização
  

  private _minimoHunter: any;
  private _assimetria: any;
  private _largura: any;
  
  public constructor(private _cameraPreview: CameraPreview) {
    this.comp = 670;
    this._channel = 0; //Setando o canal inicial Verlelho (0)
    this.windowsValue = 3;
    this.smoothinMode = 0;
  }

  // picture options, opções das fotos tiradas
  private _pictureOpts: CameraPreviewPictureOptions = {
    width: 250,
    height: 250,
    quality: 55 //0=max compression, 100=max quality
  };

  private _cameraPreviewOpts: CameraPreviewOptions = {
    x: 200, //Posição em que a câmera vai aparecer
    y: 200, //Posição em que a câmera vai aparecer
    width: 60,
    height: 60,
    tapPhoto: true,
    previewDrag: true,
    toBack: false,
    //alpha: 1
  };

  async startCamera() { // inicia a camera
   // console.log("Entrou na funcao");
    this.picture = null;
    this._cameraPreview.startCamera(this._cameraPreviewOpts).then(
      () => {
        //alert("entrou" + res);
        this.takePicture();
        //this._firstImage = this._cameraPreview.setColorEffect('mono');
      },
      (err) => {
        console.log(err)
      });
  }

  async takePicture() {
    //alert("TAKE PICTURE");
    //this._firstImage = this._cameraPreview.setColorEffect('mono');
    this._cameraPreview.takePicture(this._pictureOpts).then(
      (res) => {
        this.picture = 'data:image/jpeg;base64,' + res; // convertendo a imagem em data string jpeg

       // alert("CHEGOOU! " + this.picture);
        this.loadImage();
        this.takePicture(); // chama recursivamente

        //console.log(this.picture);
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
    this.getPointSpr(img);
  
  }

  async setupFilters() {
    this._filters.push(new GrayScaleFilter("Gray Scale"));
  }


  async refreshCanvas(image: MarvinImage) {
    image.draw(document.getElementById("canvasFilters"));
  }


  //TERMINAR ESSAFUNÇÃO, VERIFICAR CANAL RGB PARA SELECIONAR A AMOSTRAGEM.
  checkChannel(){
    if(this.channel == 0){

    }else if(this.channel == 1){

    }else if(this.channel == 2){

    }
  }

  async getPointSpr(image: MarvinImage) {
    let _soma = [];
    let _media = [];

    //Percorre o array para pegar as somas dos valores por coluna
    for (let i = 0; i < image.getHeight(); i++) {
      for (var j = 0; j < image.getWidth(); j++) {

        if (_soma[j] == null) {
          _soma.push(image.getIntComponent0(i, j))
        } else {
          _soma[j] = _soma[j] + image.getIntComponent0(i, j);
        }

      }
    }
    //Percorre o array para calcular a MÉDIA por COLUNA
    for (let i = 0; i < _soma.length; i++) {
      _media[i] = (_soma[i] / parseInt(image.getWidth()));

    }


    if (this._currentIndicesDryCell.length == 0) {
      //verifica se os valores de referência estão vazios e setam o vetor
      this._currentIndicesDryCell = _media; //Seta os valores de referência
    }

    let dadosAIM = [];
    for (let i = 0; i < _media.length; i++) {
      dadosAIM.push(_media[i] / this._currentIndicesDryCell[i]);
    }
    
  
    //PROCESSO QUE VERIFICA A OPÇÃO DE SUAVIZAÇÃO ESCOLHIDA E APLICA O MÉTODO
    if (this._smoothinMode == 0){
      this._indicesGraphic = dadosAIM; //guarda os valores das imaqgem atual
    } else if(this._smoothinMode == 1){
      this._indicesGraphic = median(dadosAIM, this.windowsValue);
    } else if(this._smoothinMode == 2){
      this._indicesGraphic = average(dadosAIM, this.windowsValue);
    }
    
    
      //this._indicesGraphic.push(dadosAIM);

     // this._indicesGraphic = dadosAIM;

      //alert(this._indicesGraphic);

      //this._view.graficoAIM.series[0].setData(this._indicesGraphic);

    //alert("DADOS " + dadosAIM);

    /**
     * O procedimento abaixo realiza a suavização por mediana,
     * passando os valores e o parametro de pontos vizinhos.
     **/
    /* console.log(this.data);
   
     if (this.data == undefined) {
         this.graficoAIM.series[0].setData(dadosAIM);
     } else {
         this.graficoAIM.series[0].setData(median(dadosAIM, this.data));
     }


   */
    /**
     * A função a seguir realiza a normalização dos valores de referência.
     */
    this.normalizacao(this._currentIndicesDryCell);

    let min = 255.0;
    for (let i = 0; i < dadosAIM.length; i++) {
      if (min > dadosAIM[i]) { min = dadosAIM[i]; }
    }

    let max = 0;
    for (let j = 0; j < dadosAIM.length; j++) {
      if (max < dadosAIM[j]) {
        max = dadosAIM[j];
      }
    }

    let teta_medio = ((max + min) / 2);

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
    this._minimoHunter = parseFloat("" + min.toFixed(3));

    // this.chartSensorgrama.series[0].addPoint([min]);
    this._indicesMin.push(this._minimoHunter);


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


   // console.log(dados + " DADOS NORMALIZAÇÃO");

    //Descomente o codigo abaixo para apresentar no grafico
    //this.graficoAIM.series[1].setData(dados); //DESCOMENTAR
    //console.log(dadosAIM);
    return dados;
  }

  //Atualiza os valores de DryCell
  dry(){
    this._currentIndicesDryCell = this._indicesAtuais;
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
}
