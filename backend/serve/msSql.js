"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var sql = require("mssql");
var msSQL = /** @class */ (function () {
    function msSQL() {
        this.connStr = {
            user: 'khrix',
            password: '123456',
            server: 'localhost',
            port: 4201,
            database: 'KHRIX_APP'
        };
        this.bd = new sql.ConnectionPool(__assign({}, this.connStr), function (call) {
        });
    }
    msSQL.prototype.connetBD = function () {
        console.log(__assign({}, this.connStr));
        this.bd.connect().then(function (item) {
            item.query("select * from user", __assign({}, item)).then(function (res) {
                JSON.stringify(res);
                console.log(JSON.stringify(res));
            });
        });
    };
    msSQL.prototype.closeDB = function () {
        return this.bd.close();
    };
    return msSQL;
}());
exports.msSQL = msSQL;
