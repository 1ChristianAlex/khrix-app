import * as express from "express";
import { msSQL } from "./msSql";

const app = express.default()
const port = 3000;
const sql = new msSQL();

app.use(function(req:express.Request, res:express.Response, next:express.NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.route('/lastUpdate').get((req:express.Request, res:express.Response,next:express.NextFunction)=>{
    sql.lastUpdate().then(item =>{
        let last_hq:Array<Object>=[];
        for (let i = 0; i < 6; i++) {
            last_hq.push(item.recordset[i])
        }
        res.json(last_hq)
        next();
    })
    
})

app.route('/comics').get((req:express.Request,res:express.Response,next:express.NextFunction)=>{
    sql.listFolder().then(item=>{
       res.json(item.recordsets)
    })
})
app.route('/comics/:folder').get((req:express.Request, res:express.Response, next:express.NextFunction)=>{
    sql.listFolder().then(item=>{
        item.recordsets.map(hq =>{
            hq.map(name =>{
               if (name.ID == req.params.folder){
                   res.json(name)
               }
            })
        })
        next()
     })
})
app.route('/comics/:folder/hq').get((req:express.Request,res:express.Response,next:express.NextFunction)=>{
    sql.listHq(req.params.folder).then(hq =>{
        let item:Array<Object> = hq.recordset
        res.json(item)
    })
})

app.listen(port, 'localhost', ()=>{
    console.log(`Server is runing on http://localhost:${port}`)
})