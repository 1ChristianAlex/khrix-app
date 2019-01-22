"use strict";
exports.__esModule = true;
var googleapis_1 = require("googleapis");
googleapis_1.google.options({
    // All requests made with this object will use these settings unless overridden.
    timeout: 1000,
    auth: '4/2gB21bGJZrwZK0twpDC6bF9O-sEEWciDpbip-bYPGnpSwvUcG_zuHHM'
});
var drive = googleapis_1.google.drive({
    version: 'v3',
    auth: '4/2gB21bGJZrwZK0twpDC6bF9O-sEEWciDpbip-bYPGnpSwvUcG_zuHHM'
});
console.log(drive.files.list({ pageSize: 3 }));
