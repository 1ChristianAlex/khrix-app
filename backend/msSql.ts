import * as sql from "mssql";
import { ComicsManager } from "./fileSR";


export class msSQL extends ComicsManager{
    constructor(){
        super()
    }
    
    private Credential = this.readJson('./local.json');
    private connStr= {...this.Credential.data}
    private pool = new sql.ConnectionPool(this.connStr);
    
    public createTable(tableName:string, tableAtr:sql.Table){
        this.pool.connect().then((con)=>{
            
            tableAtr = new sql.Table(tableName);
            tableAtr.create = true;
            const req = con.request()
            
            req.bulk(tableAtr).then(data =>{
                console.log('Table Creating sucess',data);
            })
            .catch(err =>{
                console.log('Error on table creating function',err)
            })
            
        })
    }
    
    public polutateTable(){
        
        this.listDir().then(list =>{
            this.pool.connect().then(con =>{
                const req = con.request()
                list.forEach((name,i)=>{
                    req.query(`INSERT INTO MARVEL_TITLE_NAMES VALUES ('${i}','${name}')`).then(res=>{
                        console.log(res)
                    }).catch(err=>{
                        console.log('Error on insert into DB',err)
                    })
                })
            
            })
            .catch(err=>{
                console.log(err)
            })
            
        })
    }
   
}