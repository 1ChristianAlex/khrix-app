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
    private conection = ms.createConnection(this.conString().data);
    
    public  login(user:User){
        return new Promise((res,rej)=>{
            try {
                
                this.conection.query(`SELECT * FROM USERS WHERE USER_NAME ='${user.USER_NAME}' AND password = '${user.PASSWORD}'`,(err, data:Array<User>,fild)=>{
                    (err)? rej(err):res(data[0])
                    
                })
                
            } catch (error) {
                rej(error)
            }
        })
    }
    
}


const readDirComic = () =>{
    let conString:any =  JSON.parse(readJson('./mySQL.json'));
    let conection = ms.createConnection(conString.data);
    let today = `${new Date().getMonth() +1}/${new Date().getDate()}/${new Date().getFullYear()}`
    
    fs.readdirSync('../../../../Comics/Marvel Comics').forEach((item)=>{
        conection.query(`INSERT INTO MARVEL_FOLDER (FOLDER_NAME,DATE_INSERT,DATE_MODIFICATION) VALUES 
        ('${item}','${today}','${today}')`)
    })
}

const readHqComic = () =>{
    let conString:any =  JSON.parse(readJson('./mySQL.json'));
    let conection = ms.createConnection(conString.data);
    let today = `${new Date().getMonth() +1}/${new Date().getDate()}/${new Date().getFullYear()}`;
    
}
