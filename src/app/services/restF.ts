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
  public getLastBlogPost(){
    return new Promise((res,rej)=>{
      try {
        this.httpRest.get(`${this.url}/lastBlogPost`).subscribe((lastBlog :{ID:Number,CONTENT:string,IMAGE_PATH:string,POST_DATE:string,USER_NAME:string}) =>{
          res(lastBlog);
        })
      } catch (error) {
        rej(error);
      }
    })
  }
  public getSinglePost(path){
    return new Promise((res, rej)=>{
      this.httpRest.get(`${this.url}${path}`).subscribe((post:{ID:Number,CONTENT:string,IMAGE_PATH:string,POST_DATE:string,USER_NAME:string})=>{
        res(post)
      })
    })
  }
}
