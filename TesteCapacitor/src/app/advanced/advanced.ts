import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { CameraService } from "../services/camera.service";
import { isString } from "highcharts";
import * as $ from "jquery";
import { SharedModule } from "../shared/shared.module";
import { TabsPage } from "../tabs/tabs.page";
import * as HighCharts from 'highcharts';

@Component({
  selector: "app-tab2",
  templateUrl: "advanced.html",
  styleUrls: ["advanced.scss"]
})
export class Advanced {
  charData: any;
  comprimento_deOnda: any;
  constructor(
    private alertCtrl: AlertController,
    public cameraService: CameraService,
    public tabsPage: TabsPage

  ) {

  }
  minHunter: any;
  largura: any;
  assimetria: any;
  graficoAIM: any;
  sensogramaAIM: any;

  public corEvento(comprimentoDeOnda) {
    this.comprimento_deOnda = comprimentoDeOnda.detail.value;
    this.cameraService.comp = comprimentoDeOnda.detail.value;
    //console.log(comprimentoDeOnda.detail.value);
    this.tabsPage.cor(comprimentoDeOnda.detail.value);

  }

  async chartAIM() {

    var mainchart;
  
    this.graficoAIM = HighCharts.chart("containerAIM", {
        chart: {
            type: 'scatter',
            zoomType: 'xy',
            width: 350,
            height: 300,
            backgroundColor: "black",
            events: {
                load: function () {
                    mainchart = this; // `this` is the reference to the chart
                }
            }
        },
        yAxis: {
            title: {
                text: "Reflexivity",
                style: { "color": "#ffffff" },
            },
            max: 1.2,
            min: 0
        },
        xAxis: {
            title: {
                text: "Angle",
                style: { "color": "#ffffff" }
            }
        },
        title: {
            text: 'AIM Curve',
            style: { "color": "#ffffff" },
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                color: 'rgba(223,83,83, .5)',
                showInLegend: false
            }
        },
         series:[{
            name: 'Angle',
            type: undefined //No Ionic 4, se faltar essa parte dar um erro que pode demorar em media 4 horas
            //data: [[0.6, 0.2]]
        }]
    });
}

 async sensogramaChart(){
    this.sensogramaAIM = HighCharts.chart("containerSensogramaAIM", {
        chart: {
            type: 'spline',
            marginRight: 5,
            zoomType: 'xy',
            width: 350,
            height: 300,
            backgroundColor: 'black',
            events: {
                load: function () {
    
                }
            }
        },
    
        title: {
            text: 'Sensorgram',
            style: { "color": "#ffffff" }
        },
        xAxis: {
            title: {
                text: "Time",
                style: { "color": "#ffffff" }
            },
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Pixel',
                style: { "color": "#ffffff" }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#ffffff'
            }]
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: 'x: {point.x:2f}<br/>y: {point.y:.4f}'
        },
        legend: {
            enabled: true,
        },
        exporting: {
            enabled: true,
            csv: {
                itemDelimiter: ';'
              }
        },
        series: [{
            name: 'Min',
            color: 'rgba(255, 0, 0, .6)',
            type: undefined,
            //data: []
        }/*, {
            name: 'Assimetry',
            color: 'rgba(240, 255, 0, 1)',
            data: []
        },{
            name: 'Width',
            color: 'rgba(154, 18, 179, 1)',
            data: [ ]
        }*/]
    });
}


  calibraDryCell() {
    this.cameraService.dry();
  }




  ngDoCheck() {

    //this.minHunter = this.cameraService.minimoHunter;
    //this.largura = this.cameraService.largura;
   // this.assimetria = this.cameraService.assimetria;

   // this.graficoAIM.series[0].setData(this.cameraService.indicesGraphic); //Adiciona os valores no gráfico do sensograma da tab View
   // this.sensogramaAIM.series[0].setData(this.cameraService.indicesMin);
  }

  //MÉTODO PARA MOSTRAR OU ESCONDER A CÂMERA
 /* hideShowCam() {  DESCOMENTAR SE FOR USAR
    this.cameraService.verifyHideShowCam(); 
  }
*/
  /* Métodos para dialogos sobre Mediana*/
  async smoothingMethod() {
    const alert = await this.alertCtrl.create({
      header: "Choose the smoothing method",
      inputs: [
        {
          name: "Median",
          type: "radio",
          label: "Median Filtering",
          value: "median",
          checked: true
        },
        {
          name: "Averaging",
          type: "radio",
          label: "Averaging",
          value: "averaging"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Ok",
          handler: data => {
            //this.testRadioOpen = false;
            if (data == "averaging" || data == "median") {
              this.windowDialog();
            }

            console.log("Confirm Ok");
          }
        }
      ]
    });

    await alert.present();
  }

  async windowDialog() {
    const prompt = await this.alertCtrl.create({
      header: "Interval",
      message: "Enter the value of the window",
      inputs: [
        {
          name: "mediana",
          placeholder: "Window Value",
          type: "number"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
            console.log("Executar o metodo aqui!!!");
            console.log(data.mediana);
            //this.data = data.mediana;
          }
        }
      ]
    });
    await prompt.present();
  }
/*
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
          checked: true
        },
        {
          name: "Right",
          type: "radio",
          label: "Right",
          value: "right"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Ok",
          handler: data => {
            if (data == "left") {
              this.cardSize("left");
            } else if (data == "right") {
              this.cardSize("right");
            }

            console.log("Confirm Ok");
          }
        }
      ]
    });

    await alert.present();
  }

  /*
  //MÉTODO RESPONSÁVEL POR APLICAR AS MUDANÇAS DE TAMANHO D CARD DE FONTE DE LUZ
  async cardSize(position: String) {
    //console.log("A função está sendo chamada");

    let alert = await this.alertCtrl.create({
      header: "Dimensions of the Light Source",
      inputs: [
        {
          name: "height",
          placeholder: "height: [100] base value"
        },
        {
          name: "width",
          placeholder: "width: [140] base value"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "Cancel"
        },
        {
          text: "Save",
          handler: data => {
            let valorTamanho = document.getElementById("card-color");
            let tAltura = data.height;
            let tLargura = data.width;
            valorTamanho.style.width = `${tLargura}px`;
            valorTamanho.style.height = `${tAltura}px`;

            if (isString(position)) {
              valorTamanho.style.cssFloat = String(position);
              valorTamanho.style.paddingTop = "0px";
            } else {
              valorTamanho.style.cssFloat = "none";
              valorTamanho.style.paddingTop = "0px";
            }
          }
        }
      ]
    });

    await alert.present();
  }
*/
  changeChart(type) {
    console.log(type.detail.value);
  }

  alterMax(value) {
    this.charData.yAxis.max = value;
  }
  minMax(event) {
    console.log(event.detail.value.lower);
    this.charData.yAxis.max = event.detail.value.upper;
  }

  /*clickHide() {
    let bar = document.getElementById("card-top2");
    $("#hide").click(function() {
      if (bar.style.display === "none") {
        bar.style.display = "block";
        // $('ion-range').hide();
      } else {
        bar.style.display = "none";
        //$('ion-range').show()
      }
    });
  }*/

  async minimumMethod() {
    const alert = await this.alertCtrl.create({
      header: 'Choose the minimum method',
      inputs: [
        {
          name: 'Minimum Hunt',
          type: 'radio',
          label: 'Minimum Hunt',
          value: 'hunt',
          checked: true
        },
        {
          name: 'Base Line',
          type: 'radio',
          label: 'Base Line',
          value: 'line'
        },
        {
          name: 'polynomial',
          type: 'radio',
          label: 'Polynomial',
          value: 'polynomial'
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: 'Ok',
          handler: data => {
            //this.testRadioOpen = false;
            if (data === 'line') {
              this.choiseBaseLine();
            } else if (data === 'polynomial') {
              this.choisePolynomial();
            }

            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async choiseBaseLine() {
    const prompt = await this.alertCtrl.create({
      header: "Interval",
      message: "Enter the base line value",
      inputs: [
        {
          name: "line",
          placeholder: "Base Line Value",
          type: "text"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
            console.log("Executar o metodo aqui!!!");
            console.log(data.line);
            //this.data = data.mediana;
          }
        }
      ]
    });
    await prompt.present();
  }


  async choisePolynomial() {
    const prompt = await this.alertCtrl.create({
      header: "Interval",
      message: "Enter the range of pixels",
      inputs: [
        {
          name: "polynomial",
          placeholder: "Range Pixels",
          type: "text"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
            console.log("Executar o metodo aqui!!!");
            console.log(data.polynmial);
            //this.data = data.mediana;
          }
        }
      ]
    });
    await prompt.present();
  }

  //aimShow() Exibe a div do gráfico AIM e oculta a div do gráfico Sensograma
/*aimShow(){
  let senso = document.getElementById("containerSensogramaAIM");
  let aim = document.getElementById("containerAIM");
  aim.style.display = "block";
  senso.style.display = "none";
      
  }
  //Faz o inverso da aimShow()
  sensogramaShow(){
   let senso = document.getElementById("containerSensogramaAIM");
   let aim = document.getElementById("containerAIM");
   aim.style.display = "none";
   senso.style.display = "block";
  
  
  }*/
}
