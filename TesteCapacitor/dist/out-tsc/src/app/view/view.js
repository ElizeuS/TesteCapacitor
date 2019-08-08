var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { getHighChartDataCurve, getHighChartDataSensorgram } from './../data/chart-fake';
import { ChartComponent } from './../shared/chart/chart.component';
import { Component } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { TabsPage } from '../tabs/tabs.page';
var View = /** @class */ (function () {
    function View(cameraService, tabsPage, chartComponent) {
        this.cameraService = cameraService;
        this.tabsPage = tabsPage;
        this.chartComponent = chartComponent;
        this.charData = getHighChartDataCurve;
        //console.log(this.cameraService.comp);
        //this.tabsPage.setColor(255, 0, 0);
    }
    View.prototype.ngOnChanges = function (changes) {
        console.log(changes);
        console.log(this.charData.series[0].name + " NAME");
    };
    View.prototype.changeChart = function (type) {
        //this.chartComponent.startChartView(type);
        this.charData = type.detail.value === 'sensogram' ? getHighChartDataCurve : getHighChartDataSensorgram;
        //console.log(type.detail.value);
    };
    View.prototype.ngDoCheck = function () {
        console.log("EI");
        var teste = document.getElementById("card-color2");
        var r = this.cameraService.r;
        var g = this.cameraService.g;
        var b = this.cameraService.b;
        teste.style.backgroundColor = "rgb(" + r + "," + g + ", " + b + ")";
    };
    View.prototype.ngOnInit = function () {
        console.log("NGONINIT");
        //this.chartComponent.startChartView();
    };
    View = __decorate([
        Component({
            selector: 'app-view',
            templateUrl: 'view.html',
            styleUrls: ['view.scss']
        }),
        __metadata("design:paramtypes", [CameraService, TabsPage, ChartComponent])
    ], View);
    return View;
}());
export { View };
//# sourceMappingURL=view.js.map