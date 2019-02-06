import * as fs from 'fs';




export class ComicsManager{
   constructor(){}
   
   private Path():string{
      return `../../../../Comics/Marvel Comics`;
   }
   async listFolder(){
      return await fs.readdirSync(this.Path())
   }
   
}
