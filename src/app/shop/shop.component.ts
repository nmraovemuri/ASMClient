import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  subcategories: any;
  categories: any;
  cat_subcat : any;
  id: any;
  products : any;

  constructor(private aServ : AboutService,private router : Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCategories();
   this.getSubcategories();
   this.activatedRoute.params.subscribe((params: Params) => {
    this.id = params.id; 
    console.log("ID :", this.id);
  this.getProductsBySubcatId();
});
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
    });
    console.log("cat_subcat:",this.cat_subcat);
    })
  }
  getProductsBySubcatId()
  {
    let data = {
                 "subcat_id": this.id,
               }
    console.log("subcategory ID:", this.id);          
    this.aServ.getProductsBySubcatId(data).subscribe((result:any)=>{
     // console.log("Products by Subcategory ID :", result);
      if( result && result.status == "success")
      {
          this.products = result.data;
          this.aServ.setProducts(this.products);
          console.log("Products by Subcategory ID Data:", this.products);
      }
  
      
    })
  }
  addToCart(product){
    
        this.aServ.addToCart(product);
      }


}
