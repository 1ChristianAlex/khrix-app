import * as express from "express";
import * as Fr from "./fileSR";
import { msSQL } from "./msSql";

const app = express()
const sql = new msSQL()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    
  });
  

app.get('/recents',(req, res)=>{
    
})
app.route('/').get((req,res)=>{
    
    
})
app.post('/user',(req,res)=>{
    res.send(req.param('name'))
})

app.listen(4201,(req,res)=>{
    console.log('serve on');
    
})