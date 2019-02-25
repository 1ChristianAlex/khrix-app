import { Component, OnInit } from '@angular/core';
import { RestF } from "../services/restF";
import { HQ_file } from "../services/hq_model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private rest:RestF) { }
  
  ngOnInit() {
    this.getLastUpdate();
    this.getLastBlog();
  }
  lastCategoryAdd:Array<Object>=[];
  lastHQAdd:Array<HQ_file>=[];
  lastBlogPost:Array<{TITLE_POST:string,CONTENT:string,IMAGE_PATH:string,POST_DATE:string,USER_NAME:string}> = []

  public getLastUpdate(){
    this.rest.getLastUpdate().then((obj: {hq:Array<HQ_file>, category:Array<Object>})=>{
      this.lastHQAdd = obj.hq;
      this.lastCategoryAdd = obj.category;
    })
  }
  
  public getLastBlog(){
    this.rest.getLastBlogPost().then((post:Array<{TITLE_POST:string,CONTENT:string,IMAGE_PATH:string,POST_DATE:string,USER_NAME:string}>)=>{
        post.map(item=>{
          this.lastBlogPost.push({
            ...item,
            TITLE_POST:item.TITLE_POST.replace('<h1>','').replace('</h1>','')
          })
        })
      console.log(this.lastBlogPost)
    });
  };
  
}
