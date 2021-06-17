import { Component, OnInit } from '@angular/core';

import { ASMService} from '../asm.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers :[ASMService]
})
export class AboutComponent implements OnInit {
    data :any;
 
  constructor(private asmService:ASMService) { }

  ngOnInit(): void {
    this.getAllContent();
  }
  gotoTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  getAllContent()
  {
    console.log("The About us page is displayed here");
    this.asmService.getAllContent().subscribe((res)=>{
      console.log("about content:",res);
        this.data= res;
        console.log("about data :",this.data);
    })

  }
}
