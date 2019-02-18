import * as ms from "mysql";
import { readJson } from "./conString";
import * as fs from "fs";


export class msSQL{
    constructor(){}
    
    private conString:any = JSON.parse(readJson('./mySQL.json'));
    public conection = ms.createConnection(this.conString);
}

const createTable = () =>{
    let conString:any =  JSON.parse(readJson('./mySQL.json'));
    let conection =  ms.createConnection(conString.data);

    conection.query(`CREATE TABLE MARVEL_FODLER (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        DATEIN VARCHAR(30),
        DATEMOTIFICATION VARCHAR(30),
        FODLER_NAME VARCHAR(200)
        );
        
        CREATE TABLE MARVEL_HQ (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        DATEIN VARCHAR(30),
        DATEMOTIFICATION VARCHAR(30),
        NAME_HQ VARCHAR(200),
        FK_MARVEL_FODLER INT
        )`)
        
}


const makeStuf = async () =>{
    let conString:any = await JSON.parse(readJson('./mySQL.json'));
    let conection = await ms.createConnection(conString.data);

    fs.readdirSync('../../../../Comics/Marvel Comics').forEach((item)=>{
        conection.query(`INSERT INTO MARVEL_FOLDER (FOLDER_NAME,DATEIN,DATEMOTIFICATION) VALUES 
        ('${item}','${new Date().getMonth() +1}/${new Date().getDate()}/${new Date().getFullYear()}','${new Date().getMonth() +1}/${new Date().getDate()}/${new Date().getFullYear()}')`)
    })

}
createTable();