import * as fs from 'fs';

export class ComicsManager{
   constructor(){}
   
   private Path():string{
      return `../../../../Comics/Marvel Comics`;
   }
   listDir(add?:string):Promise<Array<string>>{
      return new Promise<Array<string>>((res,rej)=>{
         let path:string;
         (add)? path = `${this.Path()}/${add}` : path = this.Path();
         fs.readdir(path,(err, file)=>{
            if (err) {
               rej(console.log('Erro on dir reader function', err))
            }
            else{
               res(file)
            }
         })
      })
   }
   readJson(path:string){
      let json:JSON = JSON.parse(fs.readFileSync(path).toString())
      return json;
   }

}