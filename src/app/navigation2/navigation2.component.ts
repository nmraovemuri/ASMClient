import { Component, OnInit } from '@angular/core';
import { AboutService} from './../about.service'

@Component({
  selector: 'app-navigation2',
  templateUrl: './navigation2.component.html',
  styleUrls: ['./navigation2.component.css']
})
export class Navigation2Component implements OnInit {  
  subcategories: any;
  categories: any;
  cat_subcat : any;

  constructor(private aServ : AboutService) { }

  ngOnInit(): void {
    this.getAllCategories();
   this.getSubcategories();
  }
  getAllCategories()
  {
    this.aServ.getAllCategories().subscribe((result:any)=>{
   //   console.log("Allcategoires Data:", data);
      if( result && result.status == "success")
      {
         this.categories = result.data;
         console.log("Allcategoires Data:", this.categories);
      }
  
      
    })
  }
  getSubcategories(){
    this.aServ.getAllSubCategories().subscribe((result:any)=>{
 //     console.log("All SubCategories:",data);
      this.subcategories = result.data;
      console.log("All SubCategories:",this.subcategories);
      this.cat_subcat = this.categories.map(cat=>{
      let  subcat = this.subcategories.filter(subcat=> subcat.category_name ===cat.category_name);
        // console.log(subcat);
        cat.subCategories = subcat;
        // JSON.parse
        return cat;
    })
    console.log("cat_subcat:",this.cat_subcat);
    })
  }
}
