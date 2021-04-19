import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ASMService } from './asm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Aswika';
  dealsOftheDay :any =[];
  constructor(private router: Router, public asmService : ASMService) { 
   
  }  
  ngOnInit(): void {    
    this.getTopDealsOfDay();
    this.getTopDealsOfDayByPercentage();
  }
  getTopDealsOfDay(){    
    this.asmService.getTopDealsOfDay().subscribe((result:any)=>{        
      console.log("Top Deals :",result.data);
      this.dealsOftheDay = result.data; 
      this.asmService.addDealsOfTheDay(result.data);
      let dealsOftheDayListByChunk = [];
      for(let i=0; i<this.dealsOftheDay.length % 5;i++)
      {
        dealsOftheDayListByChunk.push(this.dealsOftheDay.slice(i*5,(i*5)+5));
      }
      console.log("chunk data:",dealsOftheDayListByChunk);
  },
  error => {
    console.log(error);
  })  

  }
  getTopDealsOfDayByPercentage(){    
    this.asmService.getTopDealsOfDayByPercentage(30).subscribe((result:any)=>{        
      console.log("30 data :",result.data);
       this.asmService.addDealsOfTheDay30(result.data);
  },
  error => {
    console.log(error);
  })  

  }
}
