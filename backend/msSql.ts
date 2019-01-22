import * as sql from "mssql";
import bodyParser = require("body-parser");

export class msSQL{
    constructor(){
        
    }
    connStr = {
        user: 'khrix',
        password: '123456',
        server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
        port:4201,
        database: 'KHRIX_APP',
    }
    bd = new sql.ConnectionPool({...this.connStr},call =>{
        
    })
    connetBD(){
        
        console.log({...this.connStr})
        this.bd.connect().then(item =>{
            item.query(((`select * from user` as unknown) as TemplateStringsArray),{...item}).then(res =>{
                JSON.stringify(res)
                console.log(JSON.stringify(res))
            })
        })
    }
    closeDB(){
        return this.bd.close()
    }
}
