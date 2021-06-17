import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ASMService } from '../asm.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  products: any= [];
  product: any;
  index:number = 0;
  server_url : string='';// "http://localhost:3000";
  // server_url = "https://aswikamart.com";
  
  constructor(private activatedRoute: ActivatedRoute,
              public asmService : ASMService,
              public cartService: CartService) { }
  pid : any;
  unit_value : any;
  // product : any = {
  //             description_fst: "abc",
  //             description_snd: "xyz",
  //             id: 1763,
  //             price: 0,
  //             product_img: "assets/images/products/200/salted_puffed_rice.png?v=123",
  //             product_name: "ASWKA MARMUR SALT",
  //             unit_type: "pc",
  //             unit_value: "1",
  // }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.server_url = this.asmService.ASM_SERVER_BASE_URL;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pid = params.pid; 
      this.unit_value = params.unit_value;
      console.log("P-ID & unit_value :", this.pid, this.unit_value);
     // this.pid =  this.pid.substr(0, this.pid.indexOf("?"))
      this.product = this.asmService.getProduct(this.pid,this.unit_value);
      this.products = this.asmService.getproducts();
      // console.log("Product Data:", this.products);
      console.log("Product Data:", this.product);
      //this.product = this.products[this.index];
      
  },
  error => {
    console.log(error);
  });
  }
  nextProduct()
  {
    this.index = this.index + 1;
    this.product = this.products[this.index];
  }
  // addToCart(){
  //   this.cartService.addToCart(this.product);
  // }
  // addToCart(){
  //   if(this.product.quantity){
  //     this.product.quantity = this.product.quantity + 1;
  //     this.product.total_amount = this.product.sale_price * this.product.quantity;
  //   }
  //   else{
  //     this.product.quantity = 1;
  //     this.product.total_amount = this.product.sale_price * this.product.quantity;
  //     this.cartService.addToCart(this.product);
  //   }
  // }
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
  gotoTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

}
