"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sql = require("mssql");
var msSQL = /** @class */ (function () {
    function msSQL() {
        this.connStr = {
            user: 'khrix',
            password: '123456',
            server: '127.0.0.1',
            database: 'KHRIX_APP',
        };
        this.pool = new sql.ConnectionPool(this.connStr);
    }
    msSQL.prototype.conection = function () {
        var result;
        this.pool.connect().then(function (con) {
            console.log('conect');
            con.query(templateObject_1 || (templateObject_1 = __makeTemplateObject(["select * from USERS"], ["select * from USERS"]))).then(function (q) {
                result = q;
            });
            console.log(result);
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    msSQL.prototype.closeCon = function () {
        return this.pool.close();
    };
    return msSQL;
}());
exports.msSQL = msSQL;
var templateObject_1;
