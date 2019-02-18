import * as express from "express";
import bodyParser = require("body-parser");
import { User,msSQL } from "./mySQL";

const db = new msSQL;
const app = express.default()
const port = 3000;
app.use(bodyParser())
app.use(function(req:express.Request, res:express.Response, next:express.NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type','Aplication/json');
    next();
});


app.route('/user').post((req:express.Request, res:express.Response,next:express.NextFunction)=>{
    db.login(req.body).then(data=>{
        console.log(data)
        res.json(data)
        next()
    });
    
})


app.route('/lastUpdate').get((req:express.Request, res:express.Response,next:express.NextFunction)=>{
  
    
})

app.route('/comics').get((req:express.Request,res:express.Response,next:express.NextFunction)=>{
    
})
app.route('/comics/:folder').get((req:express.Request, res:express.Response, next:express.NextFunction)=>{
    
})
app.route('/comics/:folder/hq').get((req:express.Request,res:express.Response,next:express.NextFunction)=>{
  
})

app.listen(port, 'localhost', ()=>{
    console.log(`Server is runing on http://localhost:${port}`)
})