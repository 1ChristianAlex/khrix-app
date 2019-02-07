"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sql = __importStar(require("mssql"));
var fileSR_1 = require("./fileSR");
var msSQL = /** @class */ (function (_super) {
    __extends(msSQL, _super);
    function msSQL() {
        var _this = _super.call(this) || this;
        _this.Credential = _this.readJson('./local.json');
        _this.connStr = __assign({}, _this.Credential.data);
        _this.pool = new sql.ConnectionPool(_this.connStr);
        return _this;
    }
    msSQL.prototype.createTable = function (tableName, tableAtr) {
        this.pool.connect().then(function (con) {
            tableAtr = new sql.Table(tableName);
            tableAtr.create = true;
            var req = con.request();
            req.bulk(tableAtr).then(function (data) {
                console.log('Table Creating sucess', data);
            })
                .catch(function (err) {
                console.log('Error on table creating function', err);
            });
        });
    };
    msSQL.prototype.polutateTable = function () {
        var _this = this;
        this.listDir().then(function (list) {
            _this.pool.connect().then(function (con) {
                var req = con.request();
                list.forEach(function (name, i) {
                    req.query("INSERT INTO MARVEL_TITLE_NAMES VALUES ('" + i + "','" + name + "')").then(function (res) {
                        console.log(res);
                    }).catch(function (err) {
                        console.log('Error on insert into DB', err);
                    });
                });
            })
                .catch(function (err) {
                console.log(err);
            });
        });
    };
    return msSQL;
}(fileSR_1.ComicsManager));
exports.msSQL = msSQL;
