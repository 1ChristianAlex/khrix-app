import * as ms from "mysql";
import { readJson } from "./conString";
import * as fs from "fs";

export interface User{
    NAME?:string,
    EMAIL?:string,
    USER_NAME:string,
    PASSWORD:string,
    BIRTH_DATE?:string
}

export class msSQL{
    
    constructor(){}
    
    private conString(){
        return JSON.parse(readJson('./mySQL.json'));
    }
    
    private conection(){
        return ms.createConnection(this.conString().data)
    }
    
    public  login(user:User){
        return new Promise((res,rej)=>{
            try {
                
                this.conection().query(`SELECT * FROM USERS WHERE USER_NAME ='${user.USER_NAME}' AND password = '${user.PASSWORD}'`,(err, data:Array<User>,fild)=>{
                    (err)? rej(err):res(data[0])
                    
                })
                
            } catch (error) {
                rej(error)
            }
        })
    }
    public getLastHQUpdate():Promise<any>{
        return new Promise((res,rej)=>{
            this.conection().connect();
            this.conection().query(`select HQ_NAME,DATA_MODIFICATION from MARVEL_HQ
            ORDER BY DATA_MODIFICATION desc`, (err,values:Array<Object>)=>{
                if (err) {
                    rej(err)
                }
                else{
                    let lastUpdate:Array<Object>=[];
                    for (let i = 0; i < 5; i++) {
                        lastUpdate.push(values[i])
                    }
                    this.conection().end();
                    res(lastUpdate);
                }
            })
        })
    }
    public getLastCategoryUpdate():Promise<any>{
        return new Promise((res,rej)=>{
            this.conection().connect();
            this.conection().query(`SELECT * FROM MARVEL_FOLDER
            order by DATE_MODIFICATION desc;`, (err,values:Array<Object>)=>{
                if (err) {
                    rej(err)
                }
                else{
                    let lastUpdate:Array<Object>=[];
                    for (let i = 0; i < 6; i++) {
                        lastUpdate.push(values[i])
                    }
                    this.conection().end();
                    res(lastUpdate);
                }
            })
        })
    }
    public getAllComicsFolder():Promise<any>{
        return new Promise((res,rej)=>{
            this.conection().connect()

            this.conection().query(`
            select FOLDER_NAME from MARVEL_FOLDER
            `,(err, value)=>{
                if (err) {
                    rej(err)
                }
                else{
                    res(value)
                }
            })

            this.conection().end()
        })
    }
    public getAllComicsHq(id:String):Promise<any>{
        return new Promise((res,rej)=>{
            this.conection().connect()
            this.conection().query(`
            select FOLDER_NAME, HQ_NAME, H.DATA_MODIFICATION from MARVEL_FOLDER F
            inner join MARVEL_HQ H ON H.FOLDER_ID = F.ID
            where F.ID = '${id}'
            `,(err, value)=>{
                if (err) {
                    rej(err)
                }
                else{
                    res(value)
                }
            })

            this.conection().end()
        })
    }
    public getSingleHQ(id_folder:String,id_hq:String):Promise<any>{
        return new Promise((res,rej)=>{
            this.conection().connect()
            this.conection().query(`
            select HQ_NAME, H.DATA_MODIFICATION from MARVEL_HQ H
            where H.ID = '${id_hq}' and H.FOLDER_ID = '${id_folder}'
            `,(err, value)=>{
                if (err) {
                    rej(err)
                }
                else{
                    res(value)
                }
            })

            this.conection().end()
        })
    }
    public getLastBlogPost():Promise<any>{
        return new Promise((res,rej)=>{
            this.conection().connect()
            this.conection().query(`
            SELECT P.ID, P.CONTENT, P.TITLE_POST, P.IMAGE_PATH,P.POST_DATE FROM POST_BLOG_CONTENT P
            join USERS U ON P.AUTHOR = U.ID
            ORDER BY POST_DATE
            LIMIT 2`,(err, value:{ID:Number,CONTENT:string,IMAGE_PATH:string,POST_DATE:string,USER_NAME:string})=>{
                if (err) {
                    rej(err)
                }
                else{
                    console.log(value)
                    res(value)
                }
            })

            this.conection().end()
        })
    }
    public getSinglePost(id:Number):Promise<any>{
        return new Promise((res,rej)=>{
            this.conection().connect()
            this.conection().query(`
            SELECT P.ID, P.CONTENT, P.TITLE_POST, P.IMAGE_PATH,P.POST_DATE, U.USER_NAME FROM POST_BLOG_CONTENT P
            join USERS U ON P.AUTHOR = U.ID
            WHERE P.ID = ${id}`,(err, value:{CONTENT:string,IMAGE_PATH:string,POST_DATE:string,USER_NAME:string})=>{
                if (err) {
                    rej(err)
                }
                else{
                    res(value)
                }
            })

            this.conection().end()
        })
    }
    
}

export class sqlInsert{
    
    
    readDirComic = () =>{
        let conString:any =  JSON.parse(readJson('./mySQL.json'));
        let conection = ms.createConnection(conString.data);
        let today = `${new Date().getMonth() +1}/${new Date().getDate()}/${new Date().getFullYear()}`
        
        fs.readdirSync('../../../../Comics/Marvel Comics').forEach((item)=>{
            conection.query(`INSERT INTO MARVEL_FOLDER (FOLDER_NAME,DATE_INSERT,DATE_MODIFICATION) VALUES 
            ('${item}','${today}','${today}')`);
            console.log(`The file "${item}" was saved`)
        })
    }
    
    readHqComic = () =>{
        let conString:any =  JSON.parse(readJson('./mySQL.json'));
        let conection = ms.createConnection(conString.data);
        let today = `${new Date().getMonth() +1}/${new Date().getDate()}/${new Date().getFullYear()}`;
        
        conection.query(`SELECT * FROM MARVEL_FOLDER`,(err, values:Array<Object>)=>{
            values.map((single:any) =>{
                fs.readdirSync(`../../../../Comics/Marvel Comics/${single.FOLDER_NAME}`).forEach(hq=>{
                    conection.query(`INSERT INTO MARVEL_HQ (HQ_NAME,DATA_INSERT,DATA_MODIFICATION,FOLDER_ID) VALUES ('${hq}','${today}','${today}','${single.ID}')`,(err, hqr)=>{
                        console.log(`The hq ${hq} was insert into ${single.FOLDER_NAME} at ${single.ID}`)
                    })
                })
            })
        })
    }
}

