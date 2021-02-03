import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  products : any;
  cartList: any=[];
  constructor(private http:HttpClient) { }
  getAllContent()
  {
    return this.http.get("http://localhost:3000/aboutus");
  }
  createUser(data)
  {
    return this.http.post("http://localhost:3000/register",data);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
  userLogin(data)
  {
    console.log("server login data:", data);
   // return this.http.get("http://localhost:3000/login/uid",data)
   return this.http.post("http://localhost:3000/login",data)
  }
  getAllCategories() {
    

    return this.http.get("http://localhost:3000/client/getAllCategories");
  }
  getAllSubCategories() {
   
    return this.http.get("http://localhost:3000/client/getAllSubCategories");
  }
  getProductsBySubcatId(data) {
   
    return this.http.post("http://localhost:3000/client/getProductsBySubcatId",data);    
  }
  setProducts(products){
    this.products = products;
  }
  getproducts(){
    return this.products;
  }
  getProduct(pid, unit_value){
    return this.products.find((product)=>{
      return product.id == pid && product.unit_value == unit_value;

    },pid)
  }
  addToCart(product){
    this.cartList.push(product);
    console.log(this.cartList);
    
  }
  getCartList(){
    return this.cartList;

  }
  removeFromCart(product){
    this.cartList = this.cartList.filter(p=>!(p.id == product.id && p.unit_value == product.unit_value));
    console.log(this.cartList);    
  }
  incrementProductQuantityByOne(cartItem){
    console.log("cartItem:",cartItem);
    
    let product = this.cartList.find(product => product.id==cartItem.id &&  product.unit_value == cartItem.unit_value);
    product.quantity = product.quantity + 1; 
    product.total = product.sale_price * product.quantity;

  }
  decrementProductQuantityByOne(cartItem){
    let product = this.cartList.find(product => product.id==cartItem.id &&  product.unit_value == cartItem.unit_value);
   
    product.quantity = product.quantity - 1; 
    product.total = product.sale_price * product.quantity;
    if(product.quantity == 0){
      this.removeFromCart(cartItem);
      return;
    }

  }
  getCartTotalPrice(){                                                                
    return this.cartList.length == 0 ? 0:this.cartList.length == 1 ? this.cartList[0].sale_price * this.cartList[0].quantity : this.cartList.reduce((tot, item)=> (tot instanceof Object? tot.sale_price * tot.quantity : tot) + item.sale_price*item.quantity );
  }
  getCartDiscountPrice(){
    return this.cartList.length == 0 ? 0: this.cartList.length == 1?this.cartList[0].discount_amount * this.cartList[0].quantity : this.cartList.reduce((tot, item)=> (tot instanceof Object? tot.discount_amount * tot.quantity : tot) + item.discount_amount*item.quantity);
  }



}
