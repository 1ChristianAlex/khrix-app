import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class FileSService {

  constructor(private http:HttpClient) { }
  
  restUrl = 'http://localhost:8000/recents';
  getImage(){
    
    return this.http.get(this.restUrl)
  }
}
