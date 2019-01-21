import { Component, OnInit, ElementRef } from '@angular/core';
import { trigger, state, style, transition,animate } from "@angular/animations";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('hidden', style({
        visibility:'hidden',
        width:'0px'
      })),
      state('visible', style({
        visibility:'visible',
        width:'300px'
      })),
      transition('* <=> *', [
        animate('0.3s')
      ]),
    ]),
  ],
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  inputOpen:string = 'hidden';
  openInput(){
   if (this.inputOpen == 'hidden') {
     this.inputOpen = 'visible';
   }
   else{
     this.inputOpen = 'hidden';
   }
   console.log(`click ${this.inputOpen}`);
  }
  
}
