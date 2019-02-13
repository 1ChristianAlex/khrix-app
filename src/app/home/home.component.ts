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
  lastUpdates:Array<HQ_file>=[];
  getLastUpdate(){
    this.rest.getLastUpdate().then(item =>{
      item.map(hq=>{
        let name = hq.HQ_NAME.split('.')[0];
        
        this.lastUpdates.push({
          HQ_NAME:name,
          DATA_INSERT:hq.DATA_INSERT,
          FOLDER_ID:hq.FOLDER_ID,
          ID:hq.ID
        })
      })
    })
  }
  
}
