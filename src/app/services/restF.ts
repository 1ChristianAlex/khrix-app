import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HQ_file } from "../services/hq_model";

@Injectable({
  providedIn: 'root'
})
export class RestF {

  constructor(private httpRest:HttpClient) { }
  private url:string = 'http://localhost:3000'
  
  public getLastUpdate():Promise<any>{
    return new Promise((res,rej)=>{
      this.httpRest.request('get',`${this.url}/lastUpdate`).subscribe((sub: {hq:Array<HQ_file>, category:Array<Object>} )=>{
        
        res(sub)
      })
    })
  }
}
