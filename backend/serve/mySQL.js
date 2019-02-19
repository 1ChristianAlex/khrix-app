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
    constructor() { }
    conString() {
        return JSON.parse(conString_1.readJson('./mySQL.json'));
    }
    conection() {
        return ms.createConnection(this.conString().data);
    }
    login(user) {
        return new Promise((res, rej) => {
            try {
                this.conection().query(`SELECT * FROM USERS WHERE USER_NAME ='${user.USER_NAME}' AND password = '${user.PASSWORD}'`, (err, data, fild) => {
                    (err) ? rej(err) : res(data[0]);
                });
            }
            catch (error) {
                rej(error);
            }
        });
    }
    getLastHQUpdate() {
        return new Promise((res, rej) => {
            this.conection().connect();
            this.conection().query(`select HQ_NAME,DATA_MODIFICATION from MARVEL_HQ
            ORDER BY DATA_MODIFICATION desc`, (err, values) => {
                if (err) {
                    rej(err);
                }
                else {
                    let lastUpdate = [];
                    for (let i = 0; i < 6; i++) {
                        lastUpdate.push(values[i]);
                    }
                    this.conection().end();
                    res(lastUpdate);
                }
            });
        });
    }
    getLastCategoryUpdate() {
        return new Promise((res, rej) => {
            this.conection().connect();
            this.conection().query(`SELECT * FROM MARVEL_FOLDER
            order by DATE_MODIFICATION desc;`, (err, values) => {
                if (err) {
                    rej(err);
                }
                else {
                    let lastUpdate = [];
                    for (let i = 0; i < 6; i++) {
                        lastUpdate.push(values[i]);
                    }
                    this.conection().end();
                    res(lastUpdate);
                }
            });
        });
    }
    getAllComicsFolder() {
        return new Promise((res, rej) => {
            this.conection().connect();
            this.conection().query(`
            select FOLDER_NAME from MARVEL_FOLDER
            `, (err, value) => {
                if (err) {
                    rej(err);
                }
                else {
                    res(value);
                }
            });
            this.conection().end();
        });
    }
    getAllComicsHq(id) {
        return new Promise((res, rej) => {
            this.conection().connect();
            this.conection().query(`
            select FOLDER_NAME, HQ_NAME, H.DATA_MODIFICATION from MARVEL_FOLDER F
            inner join MARVEL_HQ H ON H.FOLDER_ID = F.ID
            where F.ID = '${id}'
            `, (err, value) => {
                if (err) {
                    rej(err);
                }
                else {
                    res(value);
                }
            });
            this.conection().end();
        });
    }
    getSingleHQ(id_folder, id_hq) {
        return new Promise((res, rej) => {
            this.conection().connect();
            this.conection().query(`
            select HQ_NAME, H.DATA_MODIFICATION from MARVEL_HQ H
            where H.ID = '${id_hq}' and H.FOLDER_ID = '${id_folder}'
            `, (err, value) => {
                if (err) {
                    rej(err);
                }
                else {
                    res(value);
                }
            });
            this.conection().end();
        });
    }
}
exports.msSQL = msSQL;
class sqlInsert {
    constructor() {
        this.readDirComic = () => {
            let conString = JSON.parse(conString_1.readJson('./mySQL.json'));
            let conection = ms.createConnection(conString.data);
            let today = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
            fs.readdirSync('../../../../Comics/Marvel Comics').forEach((item) => {
                conection.query(`INSERT INTO MARVEL_FOLDER (FOLDER_NAME,DATE_INSERT,DATE_MODIFICATION) VALUES 
            ('${item}','${today}','${today}')`);
                console.log(`The file "${item}" was saved`);
            });
        };
        this.readHqComic = () => {
            let conString = JSON.parse(conString_1.readJson('./mySQL.json'));
            let conection = ms.createConnection(conString.data);
            let today = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
            conection.query(`SELECT * FROM MARVEL_FOLDER`, (err, values) => {
                values.map((single) => {
                    fs.readdirSync(`../../../../Comics/Marvel Comics/${single.FOLDER_NAME}`).forEach(hq => {
                        conection.query(`INSERT INTO MARVEL_HQ (HQ_NAME,DATA_INSERT,DATA_MODIFICATION,FOLDER_ID) VALUES ('${hq}','${today}','${today}','${single.ID}')`, (err, hqr) => {
                            console.log(`The hq ${hq} was insert into ${single.FOLDER_NAME} at ${single.ID}`);
                        });
                    });
                });
            });
        };
    }
}
exports.sqlInsert = sqlInsert;
