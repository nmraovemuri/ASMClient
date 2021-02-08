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
  index:number = 0
  
  constructor(private activatedRoute: ActivatedRoute,
              private asmService : ASMService,
              private cartService: CartService) { }
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
      
  });
  }
  nextProduct()
  {
    this.index = this.index + 1;
    this.product = this.products[this.index];
  }
  addToCart(){
    this.cartService.addToCart(this.product);
  }


}
