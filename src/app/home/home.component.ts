import { Component, OnInit } from '@angular/core';
import { FileSService } from "../services/file-s.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fileS:FileSService) { }

  ngOnInit() {
    this.getPath();
  }
  imgPath:string[] = []
  
  getPath(){
    this.fileS.getImage().subscribe(item=>{
      this.imgPath.push(...item as string[])
    })
    console.log(this.imgPath)
  }
}
