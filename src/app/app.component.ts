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
  categories: any;
  subcategories: any;  
  cat_subcat : any;
  cat:any;
  subcat:any;
  constructor(private router: Router, public asmService : ASMService) { 
   
  }  
  ngOnInit(): void {    
    this.getAllCategories();
    this.getSubcategories();
    this.getTopDealsOfDay();
    this.getTopDealsOfDayByPercentage();
    
  }
  getAllCategories()
  {
    this.asmService.getAllCategories().subscribe((result:any)=>{
     //console.log("Allcategoires Data:", data);
     if( result && result.status == "success"){
        this.categories = result.data;
        this.asmService.setCategories(result.data);
        console.log("asmService-navigation:",this.asmService.getCategories());
        console.log("Allcategoires Data:", this.categories);
      }      
    },
    error => {
      console.log(error);
    })
  }
  getSubcategories(){
    this.asmService.getAllSubCategories().subscribe((result:any)=>{
    //console.log("All SubCategories:",data);
    this.subcategories = result.data;
    this.asmService.setSubcategories(this.subcategories);
    console.log("All SubCategories:",this.subcategories);
    this.cat_subcat = this.categories.map((cat: any)=>{
      let  subcat = this.subcategories.filter((subcat:any)=> subcat.category_name ===cat.category_name);
      // console.log(subcat);
      cat.subCategories = subcat;
      // JSON.parse
      return cat;
    }, this.asmService.setCatSubcat(this.cat_subcat))
    console.log("cat_subcat:",this.cat_subcat);
    },
    error => {
      console.log(error);
    })
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
