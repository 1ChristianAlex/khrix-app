"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class ComicsManager {
    constructor() { }
    Path() {
        return `../../../../Comics/Marvel Comics`;
    }
    listDir(add) {
        return new Promise((res, rej) => {
            let path;
            (add) ? path = `${this.Path()}/${add}` : path = this.Path();
            fs.readdir(path, (err, file) => {
                if (err) {
                    rej(console.log('Erro on dir reader function', err));
                }
                else {
                    res(file);
                }
            });
        });
    }
    readJson(path) {
        let json = JSON.parse(fs.readFileSync(path).toString());
        return json;
    }
}
exports.ComicsManager = ComicsManager;
