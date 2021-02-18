import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ASMService } from '../asm.service';
import { CartService } from '../cart.service';

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

  constructor(private asmService : ASMService,private router : Router,private activatedRoute: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllCategories();
   this.getSubcategories();
   this.activatedRoute.params.subscribe((params: Params) => {
    this.id = params.id; 
    console.log("ID :", this.id);
  this.getProductsBySubcatId();
  },
  error => {
    console.log(error);
  });
  }
  getAllCategories()
  {
    this.asmService.getAllCategories().subscribe((result:any)=>{
   //   console.log("Allcategoires Data:", data);
      if( result && result.status == "success")
      {
         this.categories = result.data;
         console.log("Allcategoires Data:", this.categories);
      }
    },
    error => {
      console.log(error);
    })
  }
  getSubcategories(){
    this.asmService.getAllSubCategories().subscribe((result:any)=>{
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
    },
    error => {
      console.log(error);
    })
  }
  getProductsBySubcatId()
  {
    let data = {
                 "subcat_id": this.id,
               }
    console.log("subcategory ID:", this.id);          
    this.asmService.getProductsBySubcatId(data).subscribe((result:any)=>{
     // console.log("Products by Subcategory ID :", result);
      if( result && result.status == "success")
      {
          this.products = result.data;
          this.asmService.setProducts(this.products);
          console.log("Products by Subcategory ID Data:", this.products);
      }
    },
    error => {
      console.log(error);
    })
  }
  addToCart(product){
    if(product.quantity)
       product.quantity = product.quantity + 1;
    else
      product.quantity = 1;
      
    product.total = product.sale_price * product.quantity;
    this.cartService.addToCart(product);
  }
  isHidden = false;
}
