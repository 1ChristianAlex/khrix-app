import * as fs from "fs";
import { async } from "q";



export const readDir = (path):Array<string>=>{
   return fs.readdirSync(path)
}
