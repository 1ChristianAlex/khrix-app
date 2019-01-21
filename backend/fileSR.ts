import * as fs from "fs";

export const readDir = (path)=>{
    
    fs.readdir(path,(err, file)=>{
        this.files = file
    })
    console.log(`files ${this.files}`)
    return JSON.stringify(this.files);
}
