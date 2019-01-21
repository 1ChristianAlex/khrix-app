"use strict";
exports.__esModule = true;
var express = require("express");
var fileSR_1 = require("./fileSR");
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
app.listen(8000, function (req, res) {
    console.log('serve on');
});
