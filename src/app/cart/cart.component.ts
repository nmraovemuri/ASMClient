import { Component, OnInit } from '@angular/core';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: []; 
  constructor(public aserv : AboutService) {  
    console.log("cart items are displayed");
    console.log("getCartList :",this.getCartList());   
  }
  
  ngOnInit(): void {    
  }

getCartList(){
  return this.cartList = this.aserv.getCartList();
  console.log("cart click handled :", this.cartList);
}
getCartTotalPrice(){
  return this.aserv.getCartList().length == 0 ? 0: this.aserv.getCartList().reduce((tot, item)=> (tot instanceof Object? tot.sale_price: tot) + item.sale_price);
}
getCartSize(){
  return this.aserv.getCartList().length == 0? 0: this.aserv.getCartList().length;
}
getCartDiscountPrice(){
  return this.aserv.getCartList().length == 0 ? 0: this.aserv.getCartList().reduce((tot, item)=> (tot instanceof Object? tot.discount_amount: tot) + item.discount_amount);
}


}
