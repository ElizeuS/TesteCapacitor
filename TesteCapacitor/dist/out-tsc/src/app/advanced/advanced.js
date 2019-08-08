var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { CameraService } from "../services/camera.service";
import { isString } from "highcharts";
import { getHighChartDataCurve, getHighChartDataSensorgram } from "../data/Chart-fake";
import { TabsPage } from "../tabs/tabs.page";
var Advanced = /** @class */ (function () {
    function Advanced(alertCtrl, cameraService, tabsPage) {
        this.alertCtrl = alertCtrl;
        this.cameraService = cameraService;
        this.tabsPage = tabsPage;
        this.charData = getHighChartDataCurve;
    }
    Advanced.prototype.corEvento = function (comprimentoDeOnda) {
        this.comprimento_deOnda = comprimentoDeOnda.detail.value;
        this.cameraService.comp = comprimentoDeOnda.detail.value;
        //console.log(comprimentoDeOnda.detail.value);
        this.tabsPage.cor(comprimentoDeOnda.detail.value);
    };
    //MÉTODO PARA MOSTRAR OU ESCONDER A CÂMERA
    Advanced.prototype.hideShowCam = function () {
        this.cameraService.verifyHideShowCam();
    };
    /* Métodos para dialogos sobre Mediana*/
    Advanced.prototype.smoothingMethod = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
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
                                    handler: function () {
                                        console.log("Confirm Cancel");
                                    }
                                },
                                {
                                    text: "Ok",
                                    handler: function (data) {
                                        //this.testRadioOpen = false;
                                        if (data == "averaging" || data == "median") {
                                            _this.windowDialog();
                                        }
                                        console.log("Confirm Ok");
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Advanced.prototype.windowDialog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prompt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
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
                                    handler: function (data) {
                                        console.log("Cancel clicked");
                                    }
                                },
                                {
                                    text: "Save",
                                    handler: function (data) {
                                        console.log("Executar o metodo aqui!!!");
                                        console.log(data.mediana);
                                        //this.data = data.mediana;
                                    }
                                }
                            ]
                        })];
                    case 1:
                        prompt = _a.sent();
                        return [4 /*yield*/, prompt.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //MÉTODO RESPONSÁVEL POR ALTERAR A POSIÇÃO DO CARD DA FONTE DE LUZ
    Advanced.prototype.ligthCardPosition = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
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
                                    handler: function () {
                                        console.log("Confirm Cancel");
                                    }
                                },
                                {
                                    text: "Ok",
                                    handler: function (data) {
                                        if (data == "left") {
                                            _this.cardSize("left");
                                        }
                                        else if (data == "right") {
                                            _this.cardSize("right");
                                        }
                                        console.log("Confirm Ok");
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //MÉTODO RESPONSÁVEL POR APLICAR AS MUDANÇAS DE TAMANHO D CARD DE FONTE DE LUZ
    Advanced.prototype.cardSize = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
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
                                    handler: function (data) {
                                        var valorTamanho = document.getElementById("card-color");
                                        var tAltura = data.height;
                                        var tLargura = data.width;
                                        valorTamanho.style.width = tLargura + "px";
                                        valorTamanho.style.height = tAltura + "px";
                                        if (isString(position)) {
                                            valorTamanho.style.cssFloat = String(position);
                                            valorTamanho.style.paddingTop = "0px";
                                        }
                                        else {
                                            valorTamanho.style.cssFloat = "none";
                                            valorTamanho.style.paddingTop = "0px";
                                        }
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Advanced.prototype.changeChart = function (type) {
        this.charData =
            type.detail.value === "sensogram" ? getHighChartDataSensorgram : getHighChartDataCurve;
        console.log(type.detail.value);
    };
    Advanced.prototype.alterMax = function (value) {
        this.charData.yAxis.max = value;
    };
    Advanced.prototype.minMax = function (event) {
        console.log(event.detail.value.lower);
        this.charData.yAxis.max = event.detail.value.upper;
    };
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
    Advanced.prototype.minimumMethod = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
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
                                    handler: function () {
                                        console.log("Confirm Cancel");
                                    }
                                },
                                {
                                    text: 'Ok',
                                    handler: function (data) {
                                        //this.testRadioOpen = false;
                                        if (data === 'line') {
                                            _this.choiseBaseLine();
                                        }
                                        else if (data === 'polynomial') {
                                            _this.choisePolynomial();
                                        }
                                        console.log('Confirm Ok');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Advanced.prototype.choiseBaseLine = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prompt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
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
                                    handler: function (data) {
                                        console.log("Cancel clicked");
                                    }
                                },
                                {
                                    text: "Save",
                                    handler: function (data) {
                                        console.log("Executar o metodo aqui!!!");
                                        console.log(data.line);
                                        //this.data = data.mediana;
                                    }
                                }
                            ]
                        })];
                    case 1:
                        prompt = _a.sent();
                        return [4 /*yield*/, prompt.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Advanced.prototype.choisePolynomial = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prompt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
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
                                    handler: function (data) {
                                        console.log("Cancel clicked");
                                    }
                                },
                                {
                                    text: "Save",
                                    handler: function (data) {
                                        console.log("Executar o metodo aqui!!!");
                                        console.log(data.polynmial);
                                        //this.data = data.mediana;
                                    }
                                }
                            ]
                        })];
                    case 1:
                        prompt = _a.sent();
                        return [4 /*yield*/, prompt.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Advanced = __decorate([
        Component({
            selector: "app-tab2",
            templateUrl: "advanced.html",
            styleUrls: ["advanced.scss"]
        }),
        __metadata("design:paramtypes", [AlertController,
            CameraService,
            TabsPage])
    ], Advanced);
    return Advanced;
}());
export { Advanced };
//# sourceMappingURL=advanced.js.map