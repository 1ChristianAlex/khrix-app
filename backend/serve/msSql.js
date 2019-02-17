"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql = __importStar(require("mssql"));
const fileSR_1 = require("./fileSR");
class msSQL extends fileSR_1.ComicsManager {
    constructor() {
        super();
        this.Credential = this.readJson('./local.json');
        this.connStr = JSON.parse(JSON.stringify(this.Credential));
        this.pool = new sql.ConnectionPool(this.connStr.data);
    }
    createTable(tableName, tableAtr) {
        this.pool.connect().then((con) => {
            tableAtr = new sql.Table(tableName);
            tableAtr.create = true;
            const req = con.request();
            req.bulk(tableAtr).then(data => {
                console.log('Table Creating sucess', data);
            })
                .catch(err => {
                console.log('Error on table creating function', err);
            });
        });
    }
    polutateTable() {
        let date = new Date();
        this.listDir().then(list => {
            this.pool.connect().then(con => {
                const req = con.request();
                list.forEach((name, i) => {
                    req.query(`INSERT INTO MARVEL_FOLDER VALUES ('${name}','${date.getMonth()}/${date.getDate()}/${date.getFullYear()}')`)
                        .then(res => {
                        console.log(res);
                    })
                        .catch(err => {
                        console.log('Error on insert into DB', err);
                    });
                });
            })
                .catch(err => {
                console.log(err);
            });
            let teste;
        });
    }
    populateCategory() {
        let date = new Date();
        this.pool.connect().then(con => {
            let req = con.request();
            req.query(`SELECT NAME_FOLDER,ID FROM MARVEL_FOLDER`).then(result => {
                result.recordsets.map(m => {
                    m.map(name => {
                        this.listDir(name.NAME_FOLDER).then(hq => {
                            hq.map(unit => {
                                req.query(`INSERT INTO MARVEL_HQ (HQ_NAME, FOLDER_ID, DATA_INSERT) VALUES ('${unit}',${name.ID},'${date.getMonth()}/${date.getDate()}/${date.getFullYear()}')`).then(() => {
                                    console.log(unit, name.ID);
                                }).catch(err => {
                                    console.log(err);
                                    console.log(`${unit},${name.id}`);
                                });
                            });
                        }).catch(err => {
                            console.log('erro');
                        });
                    });
                });
            });
        });
    }
    listFolder() {
        return new Promise((res, rej) => {
            this.pool.connect().then(con => {
                con.query `SELECT * FROM MARVEL_FOLDER`.then(result => {
                    res(result);
                    this.pool.close();
                }).catch(err => {
                    rej(err);
                });
            });
        });
    }
    listHq(id) {
        return new Promise((res, rej) => {
            this.pool.connect().then(con => {
                con.request().query(`Select * from MARVEL_HQ HQ
                    INNER JOIN MARVEL_FOLDER F ON HQ.FOLDER_ID = F.ID
                    WHERE F.ID = ${id}`).then(result => {
                    res(result);
                    this.pool.close();
                });
            });
        });
    }
    lastUpdate() {
        return new Promise((res, rej) => {
            this.pool.connect().then(con => {
                con.request().query(`Select * from MARVEL_HQ HQ
                    ORDER BY HQ.DATA_INSERT DESC
                    `).then(result => {
                    res(result);
                    this.pool.close();
                }).catch(err => {
                    rej(err);
                });
            });
        });
    }
}
exports.msSQL = msSQL;
