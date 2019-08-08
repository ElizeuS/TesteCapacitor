var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild } from '@angular/core';
import * as HighCharts from 'highcharts';
import { CameraService } from 'src/app/services/camera.service';
var ChartComponent = /** @class */ (function () {
    function ChartComponent(cameraService) {
        this.cameraService = cameraService;
        this.highcharts = HighCharts;
        this.chartConstructor = 'chart';
    }
    ChartComponent.prototype.ngOnChanges = function (changes) {
        var config = changes.config;
        this.myChart = HighCharts.chart(this.host.nativeElement, config.currentValue);
    };
    ChartComponent.prototype.ngOnInit = function () {
        //this.verify();
    };
    ChartComponent.prototype.verify = function () {
        if (this.teste.series[0].name.trim() === "Curve".trim()) {
            this.teste.series[0].setData(this.cameraService.indicesGraphic);
        }
        else {
            this.teste.series[0].setData(this.cameraService.indicesMin);
        }
    };
    __decorate([
        ViewChild('host'),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "host", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "config", void 0);
    ChartComponent = __decorate([
        Component({
            selector: 'app-chart',
            templateUrl: './chart.component.html',
            styleUrls: ['./chart.component.scss']
        }),
        __metadata("design:paramtypes", [CameraService])
    ], ChartComponent);
    return ChartComponent;
}());
export { ChartComponent };
//# sourceMappingURL=chart.component.js.map