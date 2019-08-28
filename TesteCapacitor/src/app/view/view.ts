import { Component, SimpleChange, ViewChild } from '@angular/core';
import { CameraService } from '../services/camera.service';
import * as HighCharts from 'highcharts';
import { getHighChartData, getHighChartData2 } from '../data/Chart-fake';
import * as $ from "jquery";
import { TabsPage } from '../tabs/tabs.page';
import {IonSegment} from '@ionic/angular';

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

@ViewChild(IonSegment) segment: IonSegment;
  public constructor(private cameraService: CameraService, public tabsPage: TabsPage) {
    //this.charData = getHighChartData;
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
            min: -2
        },
        xAxis: {
            title: {
                text: "Angle",
                style: { "color": "#ffffff" }
            }
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: 'Angle/Wavelength: {point.x:2f}<br/>RIU: {point.y:.4f}'
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



  ngOnChanges(changes: SimpleChange){
    console.log(changes);
    console.log(this.charData.series[0].name + " NAME");
    
  }

  async chartCurve(){
    
  }

  changeChart(type){
   // this.charData = type.detail.value === 'sensogram' ? getHighChartData2 : this.graficoAIM;
   const valorSegmento = type.detail.value;

  }
  ngDoCheck(){
    let teste = document.getElementById("card-color2")
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

  }
  

  ngOnInit() {
    this.chartAIM(); //Essa função está sendo inicializada assim que o aplicativo começa a ser executado
    
    this.sensogramaChart();
    //this.graficoAIM.series[0].setData(this.cameraService._indicesGraphic);
  
  }


  /*clickHide() {
    //let bar = document.getElementById("ligth-bar");
    $('#card-top2').click(function () {
        $('ion-range', 'p').hide();
    });
}*/

calibraDryCell(){
    this.cameraService.dry();
}


//aimShow() Exibe a div do gráfico AIM e oculta a div do gráfico Sensograma
aimShow(){
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


}

}





