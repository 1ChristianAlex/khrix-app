"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var msSql_1 = require("./msSql");
var app = express();
var sql = new msSql_1.msSQL();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/recents', function (req, res) {
});
app.route('/').get(function (req, res) {
});
app.post('/user', function (req, res) {
    res.send(req.param('name'));
});
app.listen(4201, function (req, res) {
    console.log('serve on');
});
