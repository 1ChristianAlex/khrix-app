"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.readDir = function (path) {
    return fs.readdirSync(path);
};
