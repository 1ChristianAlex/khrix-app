import { Component, OnInit, ElementRef } from '@angular/core';

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
      
      let inputWid = (document.querySelector('.navigation') as HTMLElement).style.width; 
      (document.querySelector('.search-input--header') as HTMLElement).style.width = inputWid;
      console.log(inputWid)
      return this.inputOpen =  true;
    }
    else{
      return this.inputOpen=  false;
    }
    
  }
}
