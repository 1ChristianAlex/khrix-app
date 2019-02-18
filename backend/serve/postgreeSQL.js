"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const conString_1 = require("./conString");
class DBPG {
    constructor() {
        this.conString = JSON.parse(conString_1.readJson('./DBPG.json'));
        this.dbPool = new pg_1.Pool(this.conString.data);
    }
}
exports.DBPG = DBPG;
let conString = JSON.parse(conString_1.readJson('./DBPG.json'));
;
let dbClient = new pg_1.Client(conString.data);
dbClient.connect().then(con => {
    console.log('conecction goes well');
    dbClient.end();
}).catch(err => {
    console.log('Erro on conection', err);
    dbClient.end();
});
