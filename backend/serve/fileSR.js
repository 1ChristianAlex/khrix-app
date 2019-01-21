"use strict";
var _this = this;
exports.__esModule = true;
var fs = require("fs");
exports.readDir = function (path) {
    fs.readdir(path, function (err, file) {
        _this.files = file;
    });
    console.log("files " + _this.files);
    return JSON.stringify(_this.files);
};
