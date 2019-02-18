import { readFileSync } from "fs";

export const readJson = (path:string) =>{
    let file = readFileSync(path);
    return file.toString();
}