import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ASMService } from '../asm.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchString  :any;  
  subcategories: any;
  categories: any;
  cat_subcat : any = [];
  products : any = [];
  productsList : any=[];
  brandsList :any =[];
  filteredBrands :any =[];
  server_url :string= ''; // "http://localhost:3000";
  // server_url = "https://aswikamart.com";
  constructor(public asmService : ASMService, private router : Router,
              private activatedRoute: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.server_url = this.asmService.ASM_SERVER_BASE_URL;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.searchString = params.search_string; 
      console.log("search String :", this.searchString);
      this.cat_subcat = this.asmService.getCatSubcat();
      // this.getAllCategories();
      // this.getSubcategories();
      this.searchProducts();     
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
  searchProducts(){
    console.log("search String:", this.searchString);
    let data = {
      search_string : this.searchString
    }
    this.asmService.getProductsBySearchString(data).subscribe((data:any)=>{
      console.log("user search result:",data);
      if( data && data.status == "success")
      {
          this.products = data.data;
          this.asmService.setProducts(this.products);
          console.log("Products by Subcategory ID Data:", this.products);
          this.productsList = this.products;
          this.brandsInit();
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
    product.total_amount = product.sale_price * product.quantity;
    this.cartService.addToCart(product);
  }
  isHidden = false;

  priceLowToHigh(){
    this.products.sort((low, high) => low.sale_price - high.sale_price)
  }
  priceHighToLow(){
    this.products.sort((low, high) => high.sale_price - low.sale_price)
  }
  Discount(){
    this.products.sort((low, high) => high.discount_percentage - low.discount_percentage)
  }
  brandsInit(){
    console.log("from brandsInit");
    
    this.brandsList =[];
    console.log("brands List:", this.brandsList);
    console.log("products=", this.products);
     
    for(let product of this.products){
      if(!this.brandsList.includes(product.product_brand)){
        this.brandsList.push(product.product_brand);
      }
    }
    console.log("brands List:", this.brandsList);  
  }
  productNameAscendingOrder(){
    this.products.sort((a, b) => {
      let fa = a.product_name.toLowerCase(),
          fb = b.product_name.toLowerCase();
          if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    })
  }
  onBrandChange(e, brand){
   console.log("event:",e.target.checked);
   console.log("barnd:", brand);
   if(e.target.checked){
     this.filteredBrands.push(brand);
   }
   else{
     this.filteredBrands = this.filteredBrands.filter(brandItem=>brandItem != brand);
   }
   console.log("filterBrands:",this.filteredBrands);
     
   if(this.filteredBrands.length > 0)
    this.products = this.productsList.filter(product=>this.filteredBrands.includes(product.product_brand));
   else
    this.products = this.productsList;

  }
  gotoTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

}
