import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  inputOpen:boolean;
  openInput(stats:boolean):boolean{
    if (this.inputOpen == true) {
      return this.inputOpen = false;
    }
    if (stats == true) {
      return this.inputOpen =  true;
    }
    else{
      return this.inputOpen=  false;
    }
    
  }
}
