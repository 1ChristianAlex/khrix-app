"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms = __importStar(require("mysql"));
const conString_1 = require("./conString");
const fs = __importStar(require("fs"));
class msSQL {
    constructor() {
        this.conString = JSON.parse(conString_1.readJson('./mySQL.json'));
        this.conection = ms.createConnection(this.conString);
    }
}
exports.msSQL = msSQL;
const createTable = () => {
    let conString = JSON.parse(conString_1.readJson('./mySQL.json'));
    let conection = ms.createConnection(conString.data);
    conection.query(`CREATE TABLE MARVEL_FODLER (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        DATEIN VARCHAR(30),
        DATEMOTIFICATION VARCHAR(30),
        FODLER_NAME VARCHAR(200)
        );
        
        CREATE TABLE MARVEL_HQ (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        DATEIN VARCHAR(30),
        DATEMOTIFICATION VARCHAR(30),
        NAME_HQ VARCHAR(200),
        FK_MARVEL_FODLER INT
        )`);
};
const makeStuf = () => __awaiter(this, void 0, void 0, function* () {
    let conString = yield JSON.parse(conString_1.readJson('./mySQL.json'));
    let conection = yield ms.createConnection(conString.data);
    fs.readdirSync('../../../../Comics/Marvel Comics').forEach((item) => {
        conection.query(`INSERT INTO MARVEL_FOLDER (FOLDER_NAME,DATEIN,DATEMOTIFICATION) VALUES 
        ('${item}','${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}','${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}')`);
    });
});
createTable();
