import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { ASMService} from '../asm.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
 ProductsData = [{
  "title": "Brown eggs",
  "type": "dairy",
  "description": "Raw organic brown eggs in a basket",
  "filename": "0.jpg",
  "height": 600,
  "width": 400,
  "price": 28.1,
  "rating": 4,
  "image" : '../assets/img/item/1.jpg'
}, {
  "title": "Sweet fresh stawberry",
  "type": "fruit",
  "description": "Sweet fresh stawberry on the wooden table",
  "filename": "1.jpg",
  "height": 450,
  "width": 299,
  "price": 29.45,
  "rating": 4,
  "image" : '../assets/img/item/1.jpg'
}, {
  "title": "Asparagus",
  "type": "vegetable",
  "description": "Asparagus with ham on the wooden table",
  "filename": "2.jpg",
  "height": 450,
  "width": 299,
  "price": 18.95,
  "rating": 3,
  "image" : '../assets/img/item/1.jpg'
}, {
  "title": "Green smoothie",
  "type": "dairy",
  "description": "Glass of green smoothie with quail egg's yolk, served with cocktail tube, green apple and baby spinach leaves over tin surface.",
  "filename": "3.jpg",
  "height": 600,
  "width": 399,
  "price": 17.68,
  "rating": 4,
  "image" : '../assets/img/item/1.jpg'
}, {
  "title": "Raw legums",
  "type": "vegetable",
  "description": "Raw legums on the wooden table",
  "filename": "4.jpg",
  "height": 450,
  "width": 299,
  "price": 17.11,
  "rating": 2,
  "image" : '../assets/img/item/1.jpg'
}];
categoiesData :any = [{
	"category_name": "Categories",
	"id": 1,
	"product_img": "images/categories/grocery.png",
}];
  categories: any =[];
  test : any = [10,20,30,40,50];
  cartList: []; 
  qnty: any;
  constructor(private router: Router, public asmService : ASMService, public cartService: CartService) { 
   
  }  
  ngOnInit(): void {    
    this.categoriesList();
  }
  singleProduct(){
    console.log("this.router.navigate(['update', id]) ");
    this.router.navigate(['single']);    
  }
  categoriesList(){
      this.asmService.getAllCategories().subscribe((result:any)=>{        
        console.log("categories list :",result.data);
        this.categories = result.data;
    // console.log("categories list :",this.categories);
    },
    error => {
      console.log(error);
    })  
  }
  getCartList(){
    this.cartList = this.cartService.getCartList();
    console.log("cart click handled :", this.cartList);
  }
  getCartSize(){
    return this.cartService.getCartList().length == 0? 0: this.cartService.getCartList().length;
  }
  incrementQuantityByOne(cartItem){
    console.log("cartItem e:",cartItem);  
    this.cartService.incrementProductQuantityByOne(cartItem);
  }
  decrementQuantityByOne(cartItem){
    this.cartService.decrementProductQuantityByOne(cartItem);
  }
  addToCart(product){
    if(product.quantity){
      product.quantity = product.quantity + 1;
      product.total_amount = product.sale_price * product.quantity;
    }
    else{
      product.quantity = 1;
      product.total_amount = product.sale_price * product.quantity
      this.cartService.addToCart(product);
    }
  }
}
