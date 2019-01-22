import * as fs from "fs";

export const readDir = (path):Array<string>=>{
    
    fs.readdir(path,(err, file)=>{
        this.files = file
    })
    console.log(`files ${this.files}`)
    return this.files;
}
