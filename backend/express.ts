import * as express from "express";
import { readDir } from "./fileSR";
import { msSQL } from "./msSql";

const app = express()
const path:string = '../../src/assets/imagens/most-read';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/recents',(req, res)=>{
    res.send(readDir(path))
})
app.get('/sql',(req, res)=>{
    res.send(new msSQL().connetBD())
    res.end(new msSQL().closeDB())
})
app.post('/user',(req,res)=>{
    res.send(req.param('name'))
})

app.listen(4201,(req,res)=>{
    console.log('serve on');
    
})