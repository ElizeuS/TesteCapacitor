import { Component, SimpleChange, ViewChild } from '@angular/core';
import { CameraService } from '../services/camera.service';
import * as HighCharts from 'highcharts';
//import { getHighChartData, getHighChartData2 } from '../data/Chart-fake';
import * as $ from "jquery";
import { TabsPage } from '../tabs/tabs.page';
import { IonSegment, AlertController } from '@ionic/angular';
import { isString } from "highcharts";



@Component({
    selector: 'app-view',
    templateUrl: 'view.html',
    styleUrls: ['view.scss']
})
export class View {
    charData: any;
    graficoAIM: any;
    sensogramaAIM: any;
    minHunter: any;
    largura: any;
    assimetria: any;
    comprimento_deOnda: any;
    compri: any;


    @ViewChild(IonSegment) segment: IonSegment;
    public constructor(private cameraService: CameraService, public tabsPage: TabsPage, private alertCtrl: AlertController) {
        //this.charData = getHighChartData;
        this.compri = 670;
        console.log(this.cameraService.comp);
        //this.graficoAIM.series[0].setData(this.cameraService._indicesGraphic); 
        //this.tabsPage.setColor(255, 0, 0);
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
                max: 2,
                min: -1
            },
            xAxis: {
                title: {
                    text: "Angle",
                    style: { "color": "#ffffff" }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br/>',
                pointFormat: 'Pixel/(θ)/(λ): {point.x:4f}<br/>RIU: {point.y:.4f}'
            },
            title: {
                text: 'AIM Curve',
                margin: 0, //margem do titulo para o gráfico
                style: { "color": "#ffffff" },
            },
            legend: {

                backgroundColor: '#5F5A59',
                shadow: true,
                layout: 'vertical',
                width: 100,
                maxHeight: 30,
                itemMarginTop: 0,
                itemMarginBottom: 0,

                //Estilo da legenda padrão
                itemStyle: {
                    color: '#ffffff',
                    fontWeight: 'bold'
                },
                //Estilo da legenda ao clicar
                itemHiddenStyle: {
                    color: '#AEAEAE'
                }
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    color: 'rgba(255,0,0, .1)',
                    showInLegend: true
                }
            },
            exporting: {
                enabled: true,
                csv: {
                    itemDelimiter: ','
                }
            },
            series: [{
                name: 'Angle  ',
                type: undefined, //No Ionic 4, se faltar essa parte dar um erro que pode demorar em media 4 horas
                //data: [[0.6, 0.2]]
                marker: {
                    symbol: 'circle', //"circle", "square", "diamond", "triangle" and "triangle-down".
                    lineWidth: null, //largura da inha de contorno
                    fillColor: 'red', //cor do preenchimento do ponto
                    lineColor: "red", // cor do contorno do ponto
                    radius: 3
                },

            },
            {
                name: "Reference",
                type: undefined,
                marker: {
                    symbol: 'circle', //"circle", "square", "diamond", "triangle" and "triangle-down".
                    lineWidth: null, //largura da inha de contorno
                    fillColor: 'blue', //cor do preenchimento do ponto
                    lineColor: "blue", // cor do contorno do ponto
                    radius: 3
                },
            }]
        });
    }

    async sensogramaChart() {
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
                pointFormat: 'Time: {point.x:2f}<br/>y: {point.y:.4f}'
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



    ngOnChanges(changes: SimpleChange) {
        console.log(changes);
        console.log(this.charData.series[0].name + " NAME");

    }

    async chartCurve() {

    }

    /* changeChart(type) {
         // this.charData = type.detail.value === 'sensogram' ? getHighChartData2 : this.graficoAIM;
         const valorSegmento = type.detail.value;
 
     }
     */
    ngDoCheck() {
        let teste = document.getElementById("card-color")
        let r = this.cameraService.r;
        let g = this.cameraService.g;
        let b = this.cameraService.b;
        teste.style.backgroundColor = `rgb(${r},${g}, ${b})`;



        //this.sensogramaAIM.series[0].setData(this.cameraService.minimoHunter);//TESTANDO
        // getHighChartData.series[0].

        // setData(this.cameraService.indicesGraphic); 

        this.minHunter = this.cameraService.minimoHunter;
        this.largura = this.cameraService.largura;
        this.assimetria = this.cameraService.assimetria;

        this.graficoAIM.series[0].setData(this.cameraService.indicesGraphic); //Adiciona os valores no gráfico do sensograma da tab View
        this.sensogramaAIM.series[0].setData(this.cameraService.indicesMin);
        this.graficoAIM.series[1].setData(this.cameraService.normalizacao(this.cameraService._currentIndicesDryCell)) //plotando os valores de referência

    }

    ngOnInit() {
        this.chartAIM(); //Essa função está sendo inicializada assim que o aplicativo começa a ser executado

        this.sensogramaChart();
        //this.graficoAIM.series[0].setData(this.cameraService._indicesGraphic);

    }

    hideShowCam() {
        this.cameraService.verifyHideShowCam();
    }



    /*clickHide() {
      //let bar = document.getElementById("ligth-bar");
      $('#card-top2').click(function () {
          $('ion-range', 'p').hide();
      });
  }*/

    calibraDryCell() {
        this.cameraService.dry();
    }


    //aimShow() Exibe a div do gráfico AIM e oculta a div do gráfico Sensograma
    aimShow() {
        let sensog = document.getElementById("containerSensogramaAIM");
        let aims = document.getElementById("containerAIM");
        aims.style.display = "block";
        sensog.style.display = "none";

    }
    //Faz o inverso da aimShow()
    sensogramaShow() {
        let senso = document.getElementById("containerSensogramaAIM");
        let aim = document.getElementById("containerAIM");
        aim.style.display = "none";
        senso.style.display = "block";


    }

    clear() {
        //alert(this.cameraService.indicesMin);
        this.cameraService.indicesMin = []; //Apaga os valores do gráfico do sensograma
        //alert(this.cameraService.normalizacao(this.cameraService._currentIndicesDryCell)) 

    }

    public async corEvento(comprimentoDeOnda) {
        if (comprimentoDeOnda === 781)
            this.comprimento_deOnda = "comprimentoDeOnda.detail.value";
        else
            this.comprimento_deOnda = comprimentoDeOnda.detail.value;

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

                        if (data == "median") {
                            this.cameraService.smoothinMode = 1;
                            this.windowDialog();

                        } else if (data == "averaging") {
                            this.cameraService.smoothinMode = 2;
                            this.windowDialog();
                        }
                        console.log(data);
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
                    name: "windows",
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
                        //alert(data.windows);
                        this.cameraService.windowsValue = data.windows;
                        //this.data = data.mediana;
                    }
                }
            ]
        });
        await prompt.present();
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

}





