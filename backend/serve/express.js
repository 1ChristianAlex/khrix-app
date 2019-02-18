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
const bodyParser = require("body-parser");
const mySQL_1 = require("./mySQL");
const db = new mySQL_1.msSQL;
const app = express.default();
const port = 3000;
app.use(bodyParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'Aplication/json');
    next();
});
app.route('/user').post((req, res, next) => {
    db.login(req.body).then(data => {
        console.log(data);
        res.json(data);
        next();
    });
});
app.route('/lastUpdate').get((req, res, next) => {
});
app.route('/comics').get((req, res, next) => {
});
app.route('/comics/:folder').get((req, res, next) => {
});
app.route('/comics/:folder/hq').get((req, res, next) => {
});
app.listen(port, 'localhost', () => {
    console.log(`Server is runing on http://localhost:${port}`);
});
