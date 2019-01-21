import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  hq_tittles:string[] = ['Miles Morales', 'Spider-Gwen', 'Batman', 'Titans','Flash', 'Green Arrow',"The Avenger", 'X-man',"Venom"];
}
