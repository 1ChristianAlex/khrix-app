import * as sql from "mssql";
import bodyParser = require("body-parser");



export class msSQL{
    constructor(){
        
    }
    private connStr = {
        user: 'khrix',
        password: '123456',
        server: '127.0.0.1', // You can use 'localhost\\instance' to connect to named instance
        database: 'KHRIX_APP',
    }
    private pool = new sql.ConnectionPool(this.connStr);
    conection(){
        let result;
        this.pool.connect().then(con =>{
            console.log('conect')
            con.query `select * from USERS`.then(q =>{
                 result = q
                 
            })
            console.log(result)
        })
        .catch(err=>{
            console.error(err)
        })
        
    }
    closeCon(){
        return this.pool.close()
    }
}