import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ASMService{
  products : any;
  ASM_SERVER_BASE_URL = "http://localhost:3000";

  constructor(private http:HttpClient) { }
  getAllContent() {
    return this.http.get(this.ASM_SERVER_BASE_URL+"/aboutus");
  }
  createUser(data)  {
    return this.http.post(this.ASM_SERVER_BASE_URL+"/register", data);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
  userLogin(data)  {
    console.log("server login data:", data);
   // return this.http.get("http://localhost:3000/login/uid",data)
   return this.http.post(this.ASM_SERVER_BASE_URL+"/login", data)
  }
  getAllCategories() {
    return this.http.get(this.ASM_SERVER_BASE_URL+"/client/getAllCategories");
  }
  getAllSubCategories() {   
    return this.http.get(this.ASM_SERVER_BASE_URL+"/client/getAllSubCategories");
  }
  getProductsBySubcatId(data) {   
    return this.http.post(this.ASM_SERVER_BASE_URL+"/client/getProductsBySubcatId", data);    
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
}
