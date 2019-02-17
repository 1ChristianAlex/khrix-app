"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const msSql_1 = require("./msSql");
const app = express.default();
const port = 3000;
const sql = new msSql_1.msSQL();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.route('/lastUpdate').get((req, res, next) => {
    sql.lastUpdate().then(item => {
        let last_hq = [];
        for (let i = 0; i < 6; i++) {
            last_hq.push(item.recordset[i]);
        }
        res.json(last_hq);
        next();
    });
});
app.route('/comics').get((req, res, next) => {
    sql.listFolder().then(item => {
        res.json(item.recordsets);
    });
});
app.route('/comics/:folder').get((req, res, next) => {
    sql.listFolder().then(item => {
        item.recordsets.map(hq => {
            hq.map(name => {
                if (name.ID == req.params.folder) {
                    res.json(name);
                }
            });
        });
        next();
    });
});
app.route('/comics/:folder/hq').get((req, res, next) => {
    sql.listHq(req.params.folder).then(hq => {
        let item = hq.recordset;
        res.json(item);
    });
});
app.listen(port, 'localhost', () => {
    console.log(`Server is runing on http://localhost:${port}`);
});
