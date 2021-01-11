import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  products : any;
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
  getProduct(pid){
    return this.products.find((product)=>{
      return product.id == pid;
    },pid)
  }
}
