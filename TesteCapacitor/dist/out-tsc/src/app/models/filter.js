var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Marvin } from 'marvin';
var Filter = /** @class */ (function () {
    function Filter(name) {
        this.name = name;
    }
    return Filter;
}());
export { Filter };
var GrayScaleFilter = /** @class */ (function (_super) {
    __extends(GrayScaleFilter, _super);
    function GrayScaleFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GrayScaleFilter.prototype.applyFilter = function (img1, img2) {
        Marvin.grayScale(img1, img2);
        return img2;
    };
    return GrayScaleFilter;
}(Filter));
export { GrayScaleFilter };
var BlackAndWhiteFilter = /** @class */ (function (_super) {
    __extends(BlackAndWhiteFilter, _super);
    function BlackAndWhiteFilter(name, level) {
        var _this = _super.call(this, name) || this;
        _this.level = level;
        return _this;
    }
    BlackAndWhiteFilter.prototype.applyFilter = function (img1, img2) {
        Marvin.blackAndWhite(img1, img2, this.level);
        return img2;
    };
    return BlackAndWhiteFilter;
}(Filter));
export { BlackAndWhiteFilter };
var SepiaFilter = /** @class */ (function (_super) {
    __extends(SepiaFilter, _super);
    function SepiaFilter(name, intensity) {
        var _this = _super.call(this, name) || this;
        _this.intensity = intensity;
        return _this;
    }
    SepiaFilter.prototype.applyFilter = function (img1, img2) {
        img2.clear(0xFF000000);
        Marvin.sepia(img1, img2, this.intensity);
        return img2;
    };
    return SepiaFilter;
}(Filter));
export { SepiaFilter };
var EmbossFilter = /** @class */ (function (_super) {
    __extends(EmbossFilter, _super);
    function EmbossFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmbossFilter.prototype.applyFilter = function (img1, img2) {
        Marvin.emboss(img1, img2);
        return img2;
    };
    return EmbossFilter;
}(Filter));
export { EmbossFilter };
var EdgeDetectionFilter = /** @class */ (function (_super) {
    __extends(EdgeDetectionFilter, _super);
    function EdgeDetectionFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EdgeDetectionFilter.prototype.applyFilter = function (img1, img2) {
        img2.clear(0xFF000000);
        Marvin.prewitt(img1, img2);
        return img2;
    };
    return EdgeDetectionFilter;
}(Filter));
export { EdgeDetectionFilter };
var ResetFilter = /** @class */ (function (_super) {
    __extends(ResetFilter, _super);
    function ResetFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResetFilter.prototype.applyFilter = function (img1, img2) {
        return img1;
    };
    return ResetFilter;
}(Filter));
export { ResetFilter };
//# sourceMappingURL=filter.js.map