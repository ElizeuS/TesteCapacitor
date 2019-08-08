import { Component, OnInit, Input, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import * as HighCharts from 'highcharts';
import { CameraService } from 'src/app/services/camera.service';


@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    @ViewChild('host') host;
    @Input() config: any;
    
    teste:any;
    myChart:HighCharts.Chart;

    //highcharts = HighCharts;
    chartConstructor = 'chart';

    //graficoAIM:any;

    constructor(private cameraService: CameraService) {
    
     }

    
    ngOnChanges(changes : SimpleChanges ) {
        const {config} = changes;
        this.myChart = HighCharts.chart(this.host.nativeElement, config.currentValue);
    }

    ngOnInit() {
       // this.verify();
       //this.myChart.series[0].setData(this.cameraService.indicesGraphic);
    }

    ngDoCheck(){
     //   this.verify();
     //this.myChart.series[0].setData(this.cameraService.indicesGraphic);
    }


    verify(){
       if(this.teste.series[0].name.trim() === "Curve".trim()){
        this.teste.series[0].setData(this.cameraService.indicesGraphic);
       }else{
        this.teste.series[0].setData(this.cameraService.indicesMin);
      }
    }


}

