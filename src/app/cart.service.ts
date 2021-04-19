import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartList: any=[];
  constructor() { }
  addToCart(product){
    this.cartList.push(product);
    console.log(this.cartList);
  }
  removeFromCart(product){
    this.cartList = this.cartList.filter(p=> !(p.id == product.id && p.unit_value == product.unit_value));
    console.log(this.cartList);
  }
  getCartList(){
    return this.cartList;
  }
  
  incrementProductQuantityByOne(cartItem){
    let product = this.cartList.find(product => product.id==cartItem.id &&  product.unit_value == cartItem.unit_value);
    product.quantity = product.quantity + 1; 
    product.total_amount = product.sale_price * product.quantity;
  }
  decrementProductQuantityByOne(cartItem){
    let product = this.cartList.find(product => product.id==cartItem.id &&  product.unit_value == cartItem.unit_value);    
    product.quantity = product.quantity - 1; 
    product.total_amount = product.sale_price * product.quantity;
    if(product.quantity == 0){
      this.removeFromCart(cartItem);      
    }
  }
  getCartTotalPrice(){                                                                
  //  if(this.cartList.length == 0)   
  //     return 0;
  //   if(this.cartList.length == 1)                                                            
  //     return this.cartList[0].sale_price * this.cartList[0].quantity
  //   return this.cartList.reduce((tot, item)=> (tot instanceof Object? tot.sale_price * tot.quantity : tot) + item.sale_price*item.quantity );
    return this.cartList.reduce((tot, item)=> tot + item.sale_price*item.quantity, 0);
  }
  getCartDiscountPrice(){
    // if(this.cartList.length == 0)   
    //   return 0;
    // if(this.cartList.length == 1)  
    //   return this.cartList[0].discount_amount * this.cartList[0].quantity;
    // return this.cartList.reduce((tot, item)=> (tot instanceof Object? tot.discount_amount * tot.quantity : tot) + item.discount_amount*item.quantity);
    return this.cartList.reduce((tot, item)=>  tot + item.discount_amount*item.quantity, 0);

  }
  getCartSize(){
    return this.cartList.length;
  }
  getCartQuantity(){
    // if(this.cartList.length == 0)   
    //   return 0;
    // if(this.cartList.length == 1)  
    //   return this.cartList[0].quantity;
    // return this.cartList.reduce((tot, item)=> (tot instanceof Object? tot.quantity : tot) + item.quantity);
    return this.cartList.reduce((tot, item)=>  tot + item.quantity, 0);
  }
  clearCart(){
    this.cartList = [];
  }

}
