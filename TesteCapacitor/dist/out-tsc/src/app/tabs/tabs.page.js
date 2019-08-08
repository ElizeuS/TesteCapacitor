var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { CameraService } from '../services/camera.service';
var TabsPage = /** @class */ (function () {
    function TabsPage(cameraService) {
        this.cameraService = cameraService;
    }
    TabsPage.prototype.ngOnInit = function () {
        this.cameraService.startCamera();
        //this.cameraService.takePicture();
    };
    TabsPage.prototype.cor = function (comprimentoDeOnda) {
        this.comprimentoDeOn = comprimentoDeOnda;
        var red;
        var green;
        var blue;
        var SSS;
        if (this.comprimentoDeOn >= 380 && this.comprimentoDeOn < 440) {
            red = -(this.comprimentoDeOn - 440) / (440 - 380);
            green = 0;
            blue = 1;
        }
        else if (this.comprimentoDeOn >= 440 && this.comprimentoDeOn < 490) {
            red = 0;
            green = (this.comprimentoDeOn - 440) / (490 - 440);
            blue = 1;
        }
        else if (this.comprimentoDeOn >= 490 && this.comprimentoDeOn < 510) {
            red = 0;
            green = 1;
            blue = -(this.comprimentoDeOn - 510) / (510 - 490);
        }
        else if (this.comprimentoDeOn >= 510 && this.comprimentoDeOn < 580) {
            red = (this.comprimentoDeOn - 510) / (580 - 510);
            green = 1;
            blue = 0;
        }
        else if (this.comprimentoDeOn >= 580 && this.comprimentoDeOn < 645) {
            red = 1;
            green = -(this.comprimentoDeOn - 645) / (645 - 580);
            blue = 0;
        }
        else if (this.comprimentoDeOn >= 645 && this.comprimentoDeOn <= 780) {
            red = 1;
            green = 0;
            blue = 0;
        }
        else {
            red = 255;
            green = 255;
            blue = 255;
            this.comprimentoDeOn = "White, doesn't exist";
        }
        if (this.comprimentoDeOn >= 380 && this.comprimentoDeOn < 420) {
            SSS = 0.3 + 0.7 * (this.comprimentoDeOn - 350) / (420 - 350);
        }
        else if (this.comprimentoDeOn >= 420 && this.comprimentoDeOn <= 700) {
            SSS = 1.0;
        }
        else if (this.comprimentoDeOn > 700 && this.comprimentoDeOn <= 780) {
            SSS = 0.3 + 0.7 * (780 - this.comprimentoDeOn) / (780 - 700);
        }
        else {
            SSS = 1;
        }
        SSS *= 255;
        var r;
        var g;
        var b;
        r = Math.floor(SSS * red);
        g = Math.floor(SSS * green);
        b = Math.floor(SSS * blue);
        //let teste = document.getElementById("card-color");
        //teste.style.backgroundColor = `rgb(${r},${g}, ${b})`;
        this.setColor(r, g, b);
        this.cameraService.r = r;
        this.cameraService.g = g;
        this.cameraService.b = b;
        return { r: r, g: g, b: b };
    };
    TabsPage.prototype.setColor = function (r, g, b) {
        var teste = document.getElementById("card-color");
        teste.style.backgroundColor = "rgb(" + r + "," + g + ", " + b + ")";
    };
    TabsPage = __decorate([
        Component({
            selector: 'app-tabs',
            templateUrl: 'tabs.page.html',
            styleUrls: ['tabs.page.scss']
        }),
        __metadata("design:paramtypes", [CameraService])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.page.js.map