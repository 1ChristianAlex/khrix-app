import * as express from "express";

import { User,msSQL } from "./mySQL";
import bodyParser = require("body-parser");


const db = new msSQL;
const app = express.default()
const port = 3000;

app.use(bodyParser());
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
    db.getLastCategoryUpdate().then((content:Array<Object>) =>{
        db.getLastHQUpdate().then((hq:Array<Object>)=>{
            let group:Object = {hq:hq,category:content};
            res.json(group)
        })
    }).catch(err=>{
        console.log(err)
    })
})

app.route('/comics').get((req:express.Request,res:express.Response,next:express.NextFunction)=>{
    db.getAllComicsFolder().then(content =>{
        res.json(content);
        next();
    }).catch(err=>{
        console.log(err)
        next();
    })
    
})
app.route('/comics/category-:folder').get((req:express.Request, res:express.Response, next:express.NextFunction)=>{
    db.getAllComicsHq(req.params.folder).then(content =>{
        res.json(content);
        next();
    }).catch(err=>{
        console.log(err)
        next();
    })
    
})
app.route('/comics/category-:folder/hq-:hq').get((req:express.Request,res:express.Response,next:express.NextFunction)=>{
    db.getSingleHQ(req.params.folder,req.params.hq).then(content =>{
        res.json(content);
        next();
    }).catch(err=>{
        console.log(err)
        next();
    })
    
})

app.listen(port, 'localhost', ()=>{
    console.log(`Server is runing on http://localhost:${port}`)
})