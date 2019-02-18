"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.readJson = (path) => {
    let file = fs_1.readFileSync(path);
    return file.toString();
};
