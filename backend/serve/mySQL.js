"use strict";
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
        this.conection = ms.createConnection(this.conString().data);
    }
    conString() {
        return JSON.parse(conString_1.readJson('./mySQL.json'));
    }
    login(user) {
        return new Promise((res, rej) => {
            try {
                this.conection.query(`SELECT * FROM USERS WHERE USER_NAME ='${user.USER_NAME}' AND password = '${user.PASSWORD}'`, (err, data, fild) => {
                    (err) ? rej(err) : res(data[0]);
                });
            }
            catch (error) {
                rej(error);
            }
        });
    }
}
exports.msSQL = msSQL;
const readDirComic = () => {
    let conString = JSON.parse(conString_1.readJson('./mySQL.json'));
    let conection = ms.createConnection(conString.data);
    let today = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
    fs.readdirSync('../../../../Comics/Marvel Comics').forEach((item) => {
        conection.query(`INSERT INTO MARVEL_FOLDER (FOLDER_NAME,DATE_INSERT,DATE_MODIFICATION) VALUES 
        ('${item}','${today}','${today}')`);
    });
};
const readHqComic = () => {
    let conString = JSON.parse(conString_1.readJson('./mySQL.json'));
    let conection = ms.createConnection(conString.data);
    let today = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
};
