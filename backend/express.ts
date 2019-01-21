import * as express from "express";
import { readDir } from "./fileSR";
const app:express = express()
const path:string = '../../src/assets/imagens/most-read';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get('/recents',(req, res)=>{
    res.send(readDir(path))
    
})

app.listen(8000,(req,res)=>{
    console.log('serve on');
    
})