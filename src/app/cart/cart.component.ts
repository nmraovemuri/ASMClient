import { Component, OnInit } from '@angular/core';
import { ASMService } from '../asm.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: []; 
  constructor(public asmService : ASMService, public cartService: CartService) {  
     console.log("cart items are displayed");
     console.log("getCartList :",this.getCartList());   
  }
  ngOnInit(): void {    
  }
getCartList(){
  return this.cartList = this.cartService.getCartList();
  console.log("cart click handled :", this.cartList);
}
getCartSize(){
  return this.cartService.getCartList().length == 0? 0: this.cartService.getCartList().length;
}
incrementQuantityByOne(cartItem){
  console.log("cartItem +:",cartItem);  
  this.cartService.incrementProductQuantityByOne(cartItem);
}
decrementQuantityByOne(cartItem){
  console.log("cartItem -:",cartItem);
  this.cartService.decrementProductQuantityByOne(cartItem);
}
}
