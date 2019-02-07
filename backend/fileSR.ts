import * as fs from 'fs';

export class ComicsManager{
   constructor(){}
   
   private Path():string{
      return `../../../../Comics/Marvel Comics`;
   }
   listDir():Promise<Array<string>>{
      return new Promise<Array<string>>((res,rej)=>{
         fs.readdir(this.Path(),(err, file)=>{
            if (err) {
               rej(console.log('Erro on dir reader function', err))
            }
            else{
               res(file)
            }
         })
      })
   }
   readJson(path){
      let json:JSON = JSON.parse(fs.readFileSync(path).toString())
      return json;
   }

}