import {google} from 'googleapis';
import * as async from "async";


google.options({
    // All requests made with this object will use these settings unless overridden.
    timeout: 1000,
    auth: '4/2gB21bGJZrwZK0twpDC6bF9O-sEEWciDpbip-bYPGnpSwvUcG_zuHHM',
  });

const drive = google.drive({
    version:'v3',
    auth: '4/2gB21bGJZrwZK0twpDC6bF9O-sEEWciDpbip-bYPGnpSwvUcG_zuHHM'
})
console.log(drive.files.list({pageSize: 3}));