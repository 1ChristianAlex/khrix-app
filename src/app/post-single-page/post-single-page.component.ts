import { Component, OnInit } from '@angular/core';
import {RestF  } from "../services/restF";

@Component({
  selector: 'app-post-single-page',
  templateUrl: './post-single-page.component.html',
  styleUrls: ['./post-single-page.component.css']
})
export class PostSinglePageComponent implements OnInit {

  constructor(private rest:RestF) {}

  ngOnInit() {
    this.getPostAlive();
  }
  postAlive:any;
  getPostAlive(){
    this.rest.getSinglePost(location.pathname).then(post =>{
      this.postAlive = post[0]
    })
  }
}
