import { Component, OnInit } from '@angular/core';

import { AboutService} from './../about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers :[AboutService]
})
export class AboutComponent implements OnInit {
    data :any;
 
  constructor(private aserv:AboutService) { }

  ngOnInit(): void {
    this.getAllContent();
  }
  getAllContent()
  {
    console.log("The About us page is displayed here");
    this.aserv.getAllContent().subscribe((res)=>{
      console.log("about content:",res);
        this.data= res;
        console.log("about data :",this.data);
    })

  }
}
