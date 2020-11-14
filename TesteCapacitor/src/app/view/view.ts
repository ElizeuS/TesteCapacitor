import { Component, SimpleChange, ViewChild } from "@angular/core";
import { CameraService } from "../services/camera.service";
import * as Highcharts from "highcharts";
import * as $ from "jquery";
import { TabsPage } from "../tabs/tabs.page";
import { IonSegment, AlertController, Platform } from "@ionic/angular";
import { isString } from "highcharts";
import { SensogramaService } from "../services/sensograma.service";

import { File } from "@ionic-native/file/ngx";

import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "app-view",
  templateUrl: "view.html",
  styleUrls: ["view.scss"],
})
export class View {
  heightLigth = 100;
  widthLigth = 140;
  charData: any;
  graficoAIM: any;
  sensogramaAIM: any;
  minimoCH: any;
  largura: any;
  assimetria: any;
  comprimento_deOnda: any;
  compri: any;
  choiseMin = 1;
  private promise: Promise<string>;

  private blob: Blob;
  longitude: string;
  latitude: string;

  private channel;
  segment: string;
  public constructor(
    private platform: Platform,
    private cameraService: CameraService,
    public tabsPage: TabsPage,
    private alertCtrl: AlertController,
    private sensogramaService: SensogramaService,
    private file: File,
    private geolocation: Geolocation
  ) {
    this.segment = "aim"; //Seta o valor inicial do ion-segment

    this.compri = 670;
    console.log(this.cameraService.comp);
    //this.graficoAIM.series[0].setData(this.cameraService._indicesGraphic);
    //this.tabsPage.setColor(255, 0, 0);

    this.channel = 0; //0 = RED, 1 = GREEN, 2 = BLUE

    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        //alert(resp.coords.latitude +" "+ resp.coords.longitude);
        this.latitude = "" + resp.coords.latitude;
        this.longitude = "" + resp.coords.longitude;
        // resp.coords.longitude
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }

  /*
    Função para criar um arquivo em um determinado diretório.
    */
  createFile() {
    this.file.createFile(this.file.externalDataDirectory, "filename.txt", true);
  }

  async readFile() {
    this.promise = this.file.readAsText(
      this.file.externalDataDirectory,
      "filename.txt"
    );

    await this.promise.then((value) => {
      console.log(value);
    });
  }

  /**
   * Função para escrever em um arquivo denominado de filename.txt,
   * Esse arquivo é salvo na pasta file do diretorio da aplicação denominado de 'files'
   * o diretorio é /storage/Android/data/io.ionic/started/files/filename.txt.
   */
  writeFile(something: any, filename: string) {
    this.blob = new Blob(something);

    this.file.writeFile(
      this.file.externalDataDirectory,
      filename + ".txt",
      this.blob,
      { replace: true, append: false }
    );
  }

  async chartAIM() {
    this.graficoAIM = Highcharts.chart("containerAIM", {
      chart: {
        type: "scatter",
        zoomType: "xy",
        width: screen.width,
        height: 300,
        backgroundColor: "black",
        events: {
          load: function () {},
        },
      },
      yAxis: {
        title: {
          text: "Reflexivity",
          style: { color: "#ffffff" },
        },
        max: 1.1,
        min: 0.7,
      },
      xAxis: {
        title: {
          text: "Pixel",
          style: { color: "#ffffff" },
        },
      },
      tooltip: {
        headerFormat: "<b>{series.name}</b><br/>",
        pointFormat: "Pixel/(θ)/(λ): {point.x:4f}<br/>RIU: {point.y:.4f}",
      },
      title: {
        text: "AIM Curve",
        margin: 0, //margem do titulo para o gráfico
        style: { color: "#ffffff" },
      },
      legend: {
        backgroundColor: "#5F5A59",
        shadow: true,
        layout: "vertical",
        width: 100,
        maxHeight: 30,
        itemMarginTop: 0,
        itemMarginBottom: 0,

        //Estilo da legenda padrão
        itemStyle: {
          color: "#ffffff",
          fontWeight: "bold",
        },
        //Estilo da legenda ao clicar
        itemHiddenStyle: {
          color: "#AEAEAE",
        },
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          color: "rgba(255,0,0, .1)",
          showInLegend: true,
        },
      },
      exporting: {
        enabled: true,
        csv: {
          itemDelimiter: ",",
        },
      },
      series: [
        {
          name: "Pixel",
          type: undefined, //No Ionic 4, se faltar essa parte dar um erro que pode demorar em media 4 horas
          data: [],
          marker: {
            symbol: "circle", //"circle", "square", "diamond", "triangle" and "triangle-down".
            lineWidth: null, //largura da inha de contorno
            fillColor: "red", //cor do preenchimento do ponto
            lineColor: "red", // cor do contorno do ponto
            radius: 2,
          },
        },
        {
          name: "Reference",
          type: undefined,
          marker: {
            symbol: "circle", //"circle", "square", "diamond", "triangle" and "triangle-down".
            lineWidth: null, //largura da inha de contorno
            fillColor: "blue", //cor do preenchimento do ponto
            lineColor: "blue", // cor do contorno do ponto
            radius: 2,
          },
        },
      ],
      navigation: {
        buttonOptions: {
          enabled: true,
        },
      },
    });
  }

  async sensogramaChart() {
    this.sensogramaAIM = Highcharts.chart("containerSensogramaAIM", {
      chart: {
        type: "spline",
        marginRight: 5,
        zoomType: "xy",
        width: screen.width,
        height: 300,
        backgroundColor: "black",
        events: {
          load: function () {},
        },
      },

      title: {
        text: "Sensorgram",
        style: { color: "#ffffff" },
      },
      xAxis: {
        title: {
          text: "Time",
          style: { color: "#ffffff" },
        },
        tickPixelInterval: 150,
      },
      yAxis: {
        title: {
          text: "Pixel",
          style: { color: "#ffffff" },
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: "#ffffff",
          },
        ],
      },
      tooltip: {
        headerFormat: "<b>{series.name}</b><br/>",
        pointFormat: "Time: {point.x:2f}<br/>y: {point.y:.4f}",
      },
      legend: {
        backgroundColor: "#5F5A59",
        shadow: true,
        layout: "vertical",
        width: 100,
        itemMarginTop: 0,
        itemMarginBottom: 0,

        //Estilo da legenda padrão
        itemStyle: {
          color: "#ffffff",
          fontWeight: "bold",
        },
        //Estilo da legenda ao clicar
        itemHiddenStyle: {
          color: "#AEAEAE",
        },
      },

      plotOptions: {
        series: {
          events: {
            show: function () {
              var chart = this.chart,
                series = chart.series,
                i = series.length,
                otherSeries;
              while (i--) {
                otherSeries = series[i];
                if (otherSeries != this && otherSeries.visible) {
                  otherSeries.hide();
                }
              }
            },
            legendItemClick: function () {
              if (this.visible) {
                return false;
              }
            },
          },
        },
      },
      exporting: {
        enabled: true,
        csv: {
          itemDelimiter: ";",
        },
      },
      series: [
        {
          name: "Min",
          color: "rgba(255, 0, 0, 1)",
          type: undefined,
          marker: {
            symbol: "circle", //"circle", "square", "diamond", "triangle" and "triangle-down".
            radius: 3,
          },
          //data: []
        },
        {
          name: "Assimetry",
          color: "rgba(0, 255, 0, 1)",
          type: undefined,
          visible: false,
          marker: {
            symbol: "circle", //"circle", "square", "diamond", "triangle" and "triangle-down".
            radius: 3,
          },
        },
        {
          name: "Width",
          color: "rgba(0, 0, 255, 1)",
          type: undefined,
          visible: false,
          marker: {
            symbol: "circle", //"circle", "square", "diamond", "triangle" and "triangle-down".
            radius: 3,
          },
        },
      ],
      navigation: {
        buttonOptions: {
          enabled: true,
        },
      },
    });
  }

  ngOnChanges(changes: SimpleChange) {
    console.log(changes);
    console.log(this.charData.series[0].name + " NAME");
  }

  async chartCurve() {}

  ngDoCheck() {
   /*  let teste = document.getElementById("card-color");
    let r = this.cameraService.r;
    let g = this.cameraService.g;
    let b = this.cameraService.b;
    teste.style.backgroundColor = `rgb(${r},${g}, ${b})`; */

    //this.sensogramaAIM.series[0].setData(this.cameraService.minimoHunter);//TESTANDO
    // getHighChartData.series[0].

    // setData(this.cameraService.indicesGraphic); #DEFASADO
    if (this.channel == 0) {
      this.minimoCH = this.sensogramaService.minimoR;
    } else if (this.channel == 1) {
      this.minimoCH = this.sensogramaService.minimoG;
    } else if (this.channel == 2) {
      this.minimoCH = this.sensogramaService.minimoB;
    }

    this.largura = this.sensogramaService.largura;
    this.assimetria = this.sensogramaService.assimetria;
  }

  ngAfterViewChecked() {
    //plotando os valores de referência
    try {
      switch (this.channel) {
        case 0:
          if (this.cameraService.smoothinMode == 0) {
            this.graficoAIM.series[0].setData(
              this.cameraService.indicesGraphic
            ); //Adiciona os valores no gráfico do sensograma da tab View
          } else if (this.cameraService.smoothinMode == 1) {
            this.graficoAIM.series[0].setData(
              this.cameraService.indicesGraphicRMedian
            );
          } else if ((this.cameraService.smoothinMode = 2)) {
            this.graficoAIM.series[0].setData(
              this.cameraService.indicesGraphicRMean
            );
          }
          this.graficoAIM.series[1].setData(
            this.cameraService.normalizacao(
              this.cameraService._currentIndicesDryCell
            )
          ); //plotando os valores de referência
          this.sensogramaAIM.series[0].setData(
            this.sensogramaService.indicesMinimoR
          );
          break;

        case 1:
          if (this.cameraService.smoothinMode == 0) {
            this.graficoAIM.series[0].setData(
              this.cameraService.indicesGraphicG
            ); //Adiciona os valores no gráfico do sensograma da tab View
          } else if (this.cameraService.smoothinMode == 1) {
            this.graficoAIM.series[0].setData(
              this.cameraService.indicesGraphicGMedian
            );
          } else if ((this.cameraService.smoothinMode = 2)) {
            this.graficoAIM.series[0].setData(
              this.cameraService.indicesGraphicGMean
            );
          }
          this.graficoAIM.series[1].setData(
            this.cameraService.normalizacao(
              this.cameraService._currentIndicesDryCellG
            )
          ); //plotando os valores de referência
          this.sensogramaAIM.series[0].setData(
            this.sensogramaService.indicesMinimoG
          );
          break;

        case 2:
          if (this.cameraService.smoothinMode == 0) {
            this.graficoAIM.series[0].setData(
              this.cameraService.indicesGraphicB
            ); //Adiciona os valores no gráfico do sensograma da tab View
          } else if (this.cameraService.smoothinMode == 1) {
            this.graficoAIM.series[0].setData(
              this.cameraService.indicesGraphicBMedian
            );
          } else if ((this.cameraService.smoothinMode = 2)) {
            this.graficoAIM.series[0].setData(
              this.cameraService.indicesGraphicBMean
            );
          }
          this.graficoAIM.series[1].setData(
            this.cameraService.normalizacao(
              this.cameraService._currentIndicesDryCellB
            )
          ); //plotando os valores de referência
          this.sensogramaAIM.series[0].setData(
            this.sensogramaService.indicesMinimoB
          );
          break;

        default:
          if (this.cameraService.smoothinMode == 0) {
            this.graficoAIM.series[0].setData(
              this.cameraService.indicesGraphic
            ); //Adiciona os valores no gráfico do sensograma da tab View
          } else if (this.cameraService.smoothinMode == 1) {
            this.graficoAIM.series[0].setData(
              this.cameraService.indicesGraphicRMedian
            );
          } else if ((this.cameraService.smoothinMode = 2)) {
            this.graficoAIM.series[0].setData(
              this.cameraService.indicesGraphicRMean
            );
          }
          this.graficoAIM.series[0].setData(
            this.cameraService.indicesGraphicRMean
          );
          this.graficoAIM.series[1].setData(
            this.cameraService.normalizacao(
              this.cameraService._currentIndicesDryCell
            )
          ); //plotando os valores de referência

          break;
      }
    } catch (error) {
      //alert(error)
    } finally {
      this.sensogramaAIM.series[1].setData(
        this.sensogramaService.indicesAssimetry
      );
      this.sensogramaAIM.series[2].setData(this.sensogramaService.indicesWidth);
    }
    //this.graficoAIM.series[0].setData(this.cameraService.indicesGraphic); //Adiciona os valores no gráfico do sensograma da tab View

    //this.graficoAIM.series[1].setData(this.cameraService.normalizacao(this.cameraService._currentIndicesDryCell)); //plotando os valores de referência

    //Chamada dos métodos de implementção dos valores dos sensogramas

    // DESCOMENTAR this.sensogramaAIM.series[0].setData(this.sensogramaService.indicesMinimo);
    /*     try {
          if (this.channel == 0) {
            this.sensogramaAIM.series[0].setData(
              this.sensogramaService.indicesMinimoR
            );
          } else if (this.channel == 1) {
            this.sensogramaAIM.series[0].setData(
              this.sensogramaService.indicesMinimoG
            );
          } else if (this.channel == 2) {
            this.sensogramaAIM.series[0].setData(
              this.sensogramaService.indicesMinimoB
            );
          } else {
            this.sensogramaAIM.series[0].setData(
              this.sensogramaService.indicesMinimoR
            );
          }
          //this.sensogramaAIM.series[0].setData(this.sensogramaService.indicesMinimoR);
          this.sensogramaAIM.series[1].setData(
            this.cameraService.indicesAssimetry
          );
          this.sensogramaAIM.series[2].setData(this.cameraService.indicesWidth);
        } catch (error) {
          // alert(error)
        } */
  }
  ngOnInit() {
    this.chartAIM(); //Essa função está sendo inicializada assim que o aplicativo começa a ser executado

    this.sensogramaChart();
    //this.graficoAIM.series[0].setData(this.cameraService._indicesGraphic);
  }

  hideShowCam() {
    this.cameraService.verifyHideShowCam();
  }

  calibraDryCell() {
    this.cameraService.dry();
    this.downloadReferences("Dry");

    // this.cameraService.stopCamera();
  }

  //aimShow() Exibe a div do gráfico AIM e oculta a div do gráfico Sensograma e o processo contrário
  async aimShow() {
    console.log(this.segment);
    let sensog = document.getElementById("containerSensogramaAIM");
    let aims = document.getElementById("containerAIM");

    if (String(this.segment) == "aim") {
      aims.style.display = "block";
      sensog.style.display = "none";
    } else if (String(this.segment) == "sensogram") {
      aims.style.display = "none";
      sensog.style.display = "block";
    }
  }
  //Faz o inverso da aimShow()
  /*sensogramaShow() {
        let senso = document.getElementById("containerSensogramaAIM");
        let aim = document.getElementById("containerAIM");
        aim.style.display = "none";
        senso.style.display = "block";
    }*/

  clear() {
    //alert(this.cameraService.indicesMin);
    this.sensogramaService.indicesMinimoR = []; //Apaga os valores do gráfico do sensograma
    this.sensogramaService.indicesMinimoG = [];
    this.sensogramaService.indicesMinimoB = [];

    this.sensogramaService.indicesAssimetry = [];
    this.sensogramaService.indicesWidth = [];
    //console.log(this.cameraService.normalizacao(this.cameraService._currentIndicesDryCell));
  }

  public corEvento(comprimentoDeOnda) {
    if (comprimentoDeOnda.detail.value == 781)
      this.comprimento_deOnda = comprimentoDeOnda.detail.value;
    else this.comprimento_deOnda = comprimentoDeOnda.detail.value;

    this.cameraService.comp = comprimentoDeOnda.detail.value;
    //console.log(comprimentoDeOnda.detail.value);
    this.tabsPage.cor(this.cameraService.comp);
    this.compri = this.tabsPage.comprimentoDeOn;
  }

  async smoothingMethod() {
    const alert = await this.alertCtrl.create({
      header: "Choose the smoothing method",
      inputs: [
        {
          name: "Median",
          type: "radio",
          label: "Median Filtering",
          value: "median",
          checked: true,
        },
        {
          name: "Averaging",
          type: "radio",
          label: "Averaging",
          value: "averaging",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: (data) => {
            //this.testRadioOpen = false;

            if (data == "median") {
              this.cameraService.smoothinMode = 1;
              this.windowDialog();
            } else if (data == "averaging") {
              this.cameraService.smoothinMode = 2;
              this.windowDialog();
            }
            console.log(data);
            console.log("Confirm Ok");
          },
        },
      ],
    });

    await alert.present();
  }

  async windowDialog() {
    const prompt = await this.alertCtrl.create({
      header: "Interval",
      message: "Enter the value of the window",
      inputs: [
        {
          name: "windows",
          placeholder: "Window Value",
          type: "number",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          handler: (data) => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Save",
          handler: (data) => {
            console.log("Executar o metodo aqui!!!");
            //alert(data.windows);
            this.cameraService.windowsValue = data.windows;
            //this.data = data.mediana;
          },
        },
      ],
    });
    await prompt.present();
  }

  async minMethod() {
    const alert = await this.alertCtrl.create({
      header: "Choose the smoothing method",
      inputs: [
        {
          name: "Hunter",
          type: "radio",
          label: "Min Hunter",
          value: "hunter",
          checked: true,
        },
        {
          name: "Polinomyal",
          type: "radio",
          label: "Min Polynomyal",
          value: "polinomyal",
        },
        {
          name: "Centroid",
          type: "radio",
          label: "Min Centroid",
          value: "centroid",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: (data) => {
            //this.testRadioOpen = false;

            if (data == "hunter") {
              this.cameraService.choiseMinCS = 1;
            } else if (data == "polinomyal") {
              this.cameraService.choiseMinCS = 2;
            } else if (data == "centroid") {
              this.cameraService.choiseMinCS = 3;
            } else {
              this.cameraService.choiseMinCS = 1;
            }
            console.log(data);
            console.log("Confirm Ok");
          },
        },
      ],
    });

    await alert.present();
  }

  //MÉTODO RESPONSÁVEL POR ALTERAR A POSIÇÃO DO CARD DA FONTE DE LUZ
  async ligthCardPosition() {
    const alert = await this.alertCtrl.create({
      header: "Position of the Light Source",
      inputs: [
        {
          name: "Left",
          type: "radio",
          label: "Left",
          value: "left",
          checked: true,
        },
        {
          name: "Right",
          type: "radio",
          label: "Right",
          value: "right",
        },
        {
          name: "Center",
          type: "radio",
          label: "Center",
          value: "auto",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: (data) => {
            if (data == "left") {
              this.cardSize("left");
            } else if (data == "right") {
              this.cardSize("right");
            } else if (data == "auto") {
              this.cardSize("auto");
            }

            console.log("Confirm Ok");
          },
        },
      ],
    });

    await alert.present();
  }

  //MÉTODO RESPONSÁVEL POR APLICAR AS MUDANÇAS DE TAMANHO D CARD DE FONTE DE LUZ
  async cardSize(position: String) {
    //console.log("A função está sendo chamada");

    let alert = await this.alertCtrl.create({
      header: "Dimensions of the Light Source",
      inputs: [
        {
          name: "height",
          placeholder: "height: [100] base value",
        },
        {
          name: "width",
          placeholder: "width: [140] base value",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "Cancel",
        },
        {
          text: "Save",
          handler: (data) => {
            //let valorTamanho = document.getElementById("card-color");
            let tAltura = data.height;
            let tLargura = data.width;

            this.heightLigth = data.height;
            this.widthLigth = data.width;


            /* valorTamanho.style.width = `${tLargura}px`;
            valorTamanho.style.height = `${tAltura}px`;

            console.log(position);

            if (position == "left" || position == "right") {
              valorTamanho.style.cssFloat = String(position);
              valorTamanho.style.paddingTop = "0px";
            } else {
              valorTamanho.style.cssFloat = "none";
              valorTamanho.style.marginLeft = "auto";
              valorTamanho.style.marginRight = "auto";
              valorTamanho.style.marginTop = "0";
              valorTamanho.style.paddingTop = "0px";
            } */
          },
        },
      ],
    });

    await alert.present();
  }

  clickHide() {
    let bar = document.getElementById("knob");
    if (bar.style.display == "none") {
      bar.style.display = "block";
      // $('ion-range').hide();
    } else {
      bar.style.display = "none";
      //$('ion-range').show()
    }
  }

  breakText(numbers: []) {
    let valuesWithBreak = [];
    for (let i = 0; i <= numbers.length; i++) {
      valuesWithBreak[i] = numbers[i] + "\n";
    }
    valuesWithBreak.push("Lat " + this.latitude + " ");
    valuesWithBreak.push("Long " + this.longitude);
    return valuesWithBreak;
  }

  breakTextArray(numbers: [], nColumns, nLines) {
    let valuesWithBreak = [];
    let valuesString = "";

    let aux = 0;
    for (let cont = 0; cont < nColumns * nLines; cont++) {
      if (aux == nColumns - 1) {
        valuesWithBreak.push(numbers[cont] + ",\n");
        //valuesString += numbers[cont] + ",\n";
        aux = 0;
      } else {
        valuesWithBreak.push(numbers[cont] + ",");
        //valuesString += numbers[cont] + ", ";
        aux += 1;
      }
    }
    return valuesWithBreak;
  }

  saveValues(values: any, filename: string) {
    let btValues = this.breakText(values);
    this.writeFile(btValues, filename);
  }

  saveDryCellAnCurrentIndices(values: any, filename: string) {
    let btValues = this.breakTextArray(
      values,
      this.cameraService.nColumns,
      this.cameraService.nLines
    );
    this.writeFile(btValues, filename);
  }

  saveAimIndices(values: any, filename: string) {
    let btValues = this.breakText(values);
    this.writeFile(btValues, filename);
  }

  downloadReferences(ref: string) {
    let currentdate = new Date();
    let actualyTime =
      currentdate.getDate() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getFullYear() +
      "-" +
      currentdate.getHours() +
      "-" +
      currentdate.getMinutes() +
      "-" +
      currentdate.getSeconds();
    try {
      this.saveDryCellAnCurrentIndices(
        this.cameraService.globalCHannelRed,
        "ChannelRefR_" + ref + "_" + actualyTime
      );
      this.saveDryCellAnCurrentIndices(
        this.cameraService.globalCHannelGreen,
        "ChannelRefG_" + ref + "_" + actualyTime
      );
      this.saveDryCellAnCurrentIndices(
        this.cameraService.globalCHannelBlue,
        "ChannelRefB_" + ref + "_" + actualyTime
      );
    } catch (error) {
      alert(error)
    }

    alert(actualyTime);

    return actualyTime;
  }

  downloadFiles() {
    let actualyTime = this.downloadReferences("Wet");

    /* this.saveValues(
      this.cameraService.currentRedV, //VALORES ATUAIS
      "actualyDataR_" + actualyTime
    );

    this.saveValues(
      this.sensogramaService.indicesMinimoR,
      "minValuesR_" + actualyTime
    );
    this.saveValues(
      this.sensogramaService.indicesMinimoG,
      "minValuesG_" + actualyTime
    );
    this.saveValues(
      this.sensogramaService.indicesMinimoB,
      "minValuesB_" + actualyTime
    );
    this.saveValues(
      this.cameraService._currentIndicesDryCell,
      "dryCell_" + actualyTime
    );
    this.saveValues(
      this.cameraService._currentIndicesDryCellG,
      "dryCellG_" + actualyTime
    );
    this.saveValues(
      this.cameraService._currentIndicesDryCellB,
      "dryCellB_" + actualyTime
    );
    this.saveValues(
      this.cameraService.indicesGraphic,
      "curvaAIM_" + actualyTime
    );
    this.saveValues(
      this.cameraService.indicesGraphicG,
      "curvaAIMG_" + actualyTime
    );
    this.saveValues(
      this.cameraService.indicesGraphicB,
      "curvaAIMB_" + actualyTime
    );
    this.saveValues(
      this.cameraService.indicesGraphicRMedian,
      "curvaAIMRMedian_" + actualyTime
    );
    this.saveValues(
      this.cameraService.indicesGraphicGMedian,
      "curvaAIMGMedian_" + actualyTime
    );
    this.saveValues(
      this.cameraService.indicesGraphicBMedian,
      "curvaAIMBMedian_" + actualyTime
    );
    this.saveValues(
      this.cameraService.indicesGraphicRMean,
      "curvaAIMRMean_" + actualyTime
    );
    this.saveValues(
      this.cameraService.indicesGraphicGMean,
      "curvaAIMGMean_" + actualyTime
    );
    this.saveValues(
      this.cameraService.indicesGraphicBMean,
      "curvaAIMBMean_" + actualyTime
    ); */
  }

  selectChannel(ch) {
    this.channel = ch;
    this.cameraService.channel = ch;
  }
}
