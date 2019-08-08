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
import { Injectable } from '@angular/core';
import { MarvinImage } from 'marvin';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { GrayScaleFilter } from '../models/filter';
var CameraService = /** @class */ (function () {
    function CameraService(_cameraPreview) {
        this._cameraPreview = _cameraPreview;
        this._filters = []; // filters to bind in the list
        //result1: any; //  
        this._currentIndicesDryCell = [];
        this._indicesGraphic = [];
        this._indicesMin = [];
        this._smoothinMode = 0; //Variável de seleção de suaviação
        // picture options
        this._pictureOpts = {
            width: 250,
            height: 250,
            quality: 100
        };
        this._cameraPreviewOpts = {
            x: 200,
            y: 200,
            width: 50,
            height: 50,
            tapPhoto: true,
            previewDrag: true,
            toBack: false,
        };
        this.comp = 670;
    }
    CameraService.prototype.startCamera = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log("Entrou na funcao");
                this.picture = null;
                this._cameraPreview.startCamera(this._cameraPreviewOpts).then(function (res) {
                    //alert("entrou" + res);
                    //this.takePicture();
                    //this._firstImage = this._cameraPreview.setColorEffect('mono');
                }, function (err) {
                    console.log(err);
                });
                return [2 /*return*/];
            });
        });
    };
    CameraService.prototype.takePicture = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                //alert("TAKE PICTURE");
                this._firstImage = this._cameraPreview.setColorEffect('mono');
                this._cameraPreview.takePicture(this._pictureOpts).then(function (res) {
                    _this.picture = 'data:image/jpeg;base64,' + res; // convertendo a imagem em data string jpeg
                    // alert("CHEGOOU! " + this.picture);
                    _this.loadImage();
                    _this.takePicture(); // chama recursivamente
                    //console.log(this.picture);
                }, function (err) {
                    console.log(err);
                });
                return [2 /*return*/];
            });
        });
    };
    CameraService.prototype.loadImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                this.setupFilters();
                self = this;
                this._originalImg = new MarvinImage();
                this._originalImg.load(this.picture, function () {
                    self._outputImg = new MarvinImage(this.getWidth(), this.getHeight());
                    self.itemSelected(self._filters[0]);
                });
                return [2 /*return*/];
            });
        });
    };
    CameraService.prototype.itemSelected = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var img;
            return __generator(this, function (_a) {
                img = filter.applyFilter(this._originalImg, this._outputImg);
                this.getPointSpr(img);
                return [2 /*return*/];
            });
        });
    };
    CameraService.prototype.setupFilters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._filters.push(new GrayScaleFilter("Gray Scale"));
                return [2 /*return*/];
            });
        });
    };
    CameraService.prototype.refreshCanvas = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                image.draw(document.getElementById("canvasFilters"));
                return [2 /*return*/];
            });
        });
    };
    CameraService.prototype.getPointSpr = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var _soma, _media, _dados, i, j, i, dadosAIM, i, min, i, max, j_1, teta_medio, aux, valorCL, valorCR, k;
            return __generator(this, function (_a) {
                _soma = [];
                _media = [];
                _dados = [];
                //Percorre o array para pegar as somas dos valores por coluna
                for (i = 0; i < image.getHeight(); i++) {
                    for (j = 0; j < image.getWidth(); j++) {
                        if (_soma[j] == null) {
                            _soma.push(image.getIntComponent0(i, j)); //getcomponent0 peha os valores dos canais R, G OU B
                        }
                        else {
                            _soma[j] = _soma[j] + image.getIntComponent0(i, j);
                        }
                    }
                }
                //Percorre o array para calcular a MÉDIA por COLUNA
                for (i = 0; i < _soma.length; i++) {
                    _media[i] = (_soma[i] / parseInt(image.getWidth()));
                }
                if (this._currentIndicesDryCell.length == 0) {
                    //verifica se os valores de referência estão vazios e setam o vetor
                    this._currentIndicesDryCell = _media; //Seta os valores de referência
                }
                dadosAIM = [];
                for (i = 0; i < _media.length; i++) {
                    dadosAIM.push(_media[i] / this._currentIndicesDryCell[i]);
                }
                this._indicesGraphic.push(dadosAIM);
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
                min = 255.0;
                for (i = 0; i < dadosAIM.length; i++) {
                    if (min > dadosAIM[i]) {
                        min = dadosAIM[i];
                    }
                }
                max = 0;
                for (j_1 = 0; j_1 < dadosAIM.length; j_1++) {
                    if (max < dadosAIM[j_1]) {
                        max = dadosAIM[j_1];
                    }
                }
                teta_medio = ((max + min) / 2);
                aux = 0;
                valorCL = 0;
                valorCR = 0;
                for (k = 0; k < dadosAIM.length; k++) {
                    if (dadosAIM[k] <= teta_medio) {
                        if (aux == 0) {
                            valorCL = dadosAIM[k];
                            aux++;
                        }
                        else {
                            valorCR = dadosAIM[k];
                        }
                    }
                }
                this._largura = parseFloat("" + (valorCL - valorCR).toFixed(2));
                this._assimetria = parseFloat("" + (valorCL / valorCR).toFixed(2));
                this._minimo = parseFloat("" + min.toFixed(2));
                // this.chartSensorgrama.series[0].addPoint([min]);
                this._indicesMin.push(this._minimo);
                return [2 /*return*/];
            });
        });
    };
    CameraService.prototype.normalizacao = function (dadosAIM) {
        var min = 255.0;
        var max = 0;
        var dados = [];
        for (var i = 0; i < dadosAIM.length; i++) {
            if (min > dadosAIM[i]) {
                min = dadosAIM[i];
            }
            if (max < dadosAIM[i]) {
                max = dadosAIM[i];
            }
        }
        for (var j = 0; j < dadosAIM.length; j++) {
            dados.push(((dadosAIM[j] - min) / (max - min)));
        }
        // console.log(dados + " DADOS NORMALIZAÇÃO");
        //Descomente o codigo abaixo para apresentar no grafico
        //this.graficoAIM.series[1].setData(dados); //DESCOMENTAR
        //console.log(dadosAIM);
    };
    /**
     * @method verifyHideShowCam() Verifica e exibe/esconde a câmera
     * */
    CameraService.prototype.verifyHideShowCam = function () {
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
    };
    Object.defineProperty(CameraService.prototype, "indicesGraphic", {
        get: function () {
            return this._indicesGraphic;
        },
        set: function (value) {
            this._indicesGraphic = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CameraService.prototype, "smoothinMode", {
        get: function () {
            return this._smoothinMode;
        },
        set: function (value) {
            this._smoothinMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CameraService.prototype, "indicesMin", {
        get: function () {
            return this._indicesMin;
        },
        set: function (value) {
            this._indicesMin = value;
        },
        enumerable: true,
        configurable: true
    });
    CameraService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [CameraPreview])
    ], CameraService);
    return CameraService;
}());
export { CameraService };
//# sourceMappingURL=camera.service.js.map