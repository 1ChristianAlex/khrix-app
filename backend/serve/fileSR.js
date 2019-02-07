"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var ComicsManager = /** @class */ (function () {
    function ComicsManager() {
    }
    ComicsManager.prototype.Path = function () {
        return "../../../../Comics/Marvel Comics";
    };
    ComicsManager.prototype.listDir = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            fs.readdir(_this.Path(), function (err, file) {
                if (err) {
                    rej(console.log('Erro on dir reader function', err));
                }
                else {
                    res(file);
                }
            });
        });
    };
    ComicsManager.prototype.readJson = function (path) {
        var json = JSON.parse(fs.readFileSync(path).toString());
        return json;
    };
    return ComicsManager;
}());
exports.ComicsManager = ComicsManager;
