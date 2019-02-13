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
    
    public polutateTable():void{
        let date = new Date()
        this.listDir().then(list =>{
            this.pool.connect().then(con =>{
                const req = con.request()
                list.forEach((name,i)=>{
                    req.query(`INSERT INTO MARVEL_FOLDER VALUES ('${name}','${date.getMonth()}/${date.getDate()}/${date.getFullYear()}')`)
                    .then(res=>{
                        console.log(res)
                    })
                    .catch(err=>{
                        console.log('Error on insert into DB',err)
                    })
                })
                
            })
            .catch(err=>{
                console.log(err)
            })
            
        })
        
    }
    public populateCategory():any{
        let date = new Date()
        this.pool.connect().then(con =>{
            let req = con.request();
            
            req.query(`SELECT NAME_FOLDER,ID FROM MARVEL_FOLDER`).then(result =>{
                result.recordsets.map(m =>{
                    m.map(name =>{
                        this.listDir(name.NAME_FOLDER).then(hq =>{
                            hq.map(unit =>{
                                req.query(`INSERT INTO MARVEL_HQ (HQ_NAME, FOLDER_ID, DATA_INSERT) VALUES ('${unit}',${name.ID},'${date.getMonth()}/${date.getDate()}/${date.getFullYear()}')`).then(()=>{
                                    console.log(unit,name.ID )
                                }).catch(err=>{
                                    console.log(err)
                                    console.log(`${unit},${name.id}`)
                                })
                            })
                        }).catch(err=>{
                            console.log('erro')
                        })
                    })
                })
                
            })
            
        })
        
    }    
    public listFolder():Promise<sql.IResult<any>>{
        return new Promise((res,rej)=>{
            this.pool.connect().then(con=>{
                con.query`SELECT * FROM MARVEL_FOLDER`.then(result=>{
                    res(result)
                    this.pool.close()
                }).catch(err=>{
                    rej(err)
                })
            })
        })
    }
    public listHq(id:any):Promise<sql.IResult<any>>{
        return new Promise((res,rej)=>{
            this.pool.connect().then(con=>{
                con.request().query(
                    `Select * from MARVEL_HQ HQ
                    INNER JOIN MARVEL_FOLDER F ON HQ.FOLDER_ID = F.ID
                    WHERE F.ID = ${id}`).then(result =>{
                        res(result)
                        this.pool.close()
                    })
                })
            })
            
    }
    public lastUpdate():Promise<sql.IResult<any>>{
        return new Promise((res,rej)=>{
            this.pool.connect().then(con=>{
                con.request().query(
                    `Select * from MARVEL_HQ HQ
                    ORDER BY HQ.DATA_INSERT DESC
                    `).then(result =>{
                        res(result)
                        this.pool.close()
                    }).catch(err=>{
                        rej(err)
                    })
            })
        })
    }
}
