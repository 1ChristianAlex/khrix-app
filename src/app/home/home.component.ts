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
  }
  lastCategoryAdd:Array<Object>=[];
  lastHQAdd:Array<HQ_file>=[];
  getLastUpdate(){
    this.rest.getLastUpdate().then((obj: {hq:Array<HQ_file>, category:Array<Object>})=>{
      this.lastHQAdd = obj.hq;
      this.lastCategoryAdd = obj.category;
      console.log(this.lastCategoryAdd)
      console.log(this.lastHQAdd)
    })
  }
  
}
