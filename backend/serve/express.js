"use strict";
exports.__esModule = true;
var express = require("express");
var fileSR_1 = require("./fileSR");
var msSql_1 = require("./msSql");
var app = express();
var path = '../../src/assets/imagens/most-read';
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/recents', function (req, res) {
    res.send(fileSR_1.readDir(path));
});
app.get('/sql', function (req, res) {
    res.send(new msSql_1.msSQL().connetBD());
    res.end(new msSql_1.msSQL().closeDB());
});
app.post('/user', function (req, res) {
    res.send(req.param('name'));
});
app.listen(4201, function (req, res) {
    console.log('serve on');
});
