import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ASMService{
  categories: any = [];
  subcategories: any = [];  
  cat_subcat : any = [];
  navList : any = ['','','',''];

  products : any;
  dealsOftheDayList :any =[];
  dealsOftheDayList30 :any =[];
  dealsOftheDayListByChunk :any =[];
  

    //  ASM_SERVER_BASE_URL = "http://43.241.36.16:3000";
    ASM_SERVER_BASE_URL = "http://localhost:3000";
    // ASM_SERVER_BASE_URL = "https://aswikamart.com";

  constructor(private http:HttpClient) { 
    // this.ASM_SERVER_BASE_URL = process.env.NODE_ENV === 'production' ? 'http://43.241.36.16:3000' : 'http://localhost:3000'
    // console.log("service url :", this.ASM_SERVER_BASE_URL);  
  }
  setCategories(categories){
    this.categories  = categories;
  }
  getCategories()
  {
    return this.categories;
  }
  setSubcategories(subcategories){
    this.subcategories  = subcategories;
  }
  getSubcategories()
  {
    return this.subcategories;
  }
  setCatSubcat(cat_subcat){
    this.cat_subcat = cat_subcat;
  }
  getCatSubcat(){
    return this.cat_subcat;
  }
  addDealsOfTheDay(data){
    this.dealsOftheDayList = data;
  }
  getDealsOfTheday(){
    return this.dealsOftheDayList;
  }
  addDealsOfTheDay30(data){
    this.dealsOftheDayList30 = data;
  }
  getDealsOfTheday30(){
    return this.dealsOftheDayList30;
  }
  addDealsOftheDayListByChunk(data){
    this.dealsOftheDayListByChunk = data;
  }
  getDealsOftheDayListByChunk(){
    return this.dealsOftheDayListByChunk;
  }  
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
  setProducts(products){
    this.products = products;
  }
  getproducts(){
    return this.products;
  }
  getProduct(pid, unit_value){
    return this.products.find((product)=>{
      return product.product_id == pid && product.unit_value == unit_value;

    },pid)
  }
  // Rest API Calls
  getAllContent() {
    return this.http.get(this.ASM_SERVER_BASE_URL+"/aboutus");
  }
  createUser(data)  {
    return this.http.post(this.ASM_SERVER_BASE_URL+"/register", data);
  }
  userLogin(data)  {
    console.log("server login data:", data);
   // return this.http.get("http://localhost:3000/login/uid",data)
   return this.http.post(this.ASM_SERVER_BASE_URL+"/login", data)
  }
  getAllCategories() {
    return this.http.get(this.ASM_SERVER_BASE_URL+"/client/getAllCategories/"+Date.now());
  }
  getAllSubCategories() {   
    return this.http.get(this.ASM_SERVER_BASE_URL+"/client/getAllSubCategories/"+Date.now());
  }
  getTopDealsOfDay()
  {
    return this.http.get(this.ASM_SERVER_BASE_URL+"/client/getTopDealsOfDay");
  }
  getTopDealsOfDayByPercentage(data)
  {
    return this.http.get(this.ASM_SERVER_BASE_URL+"/client/getTopDealsOfDayByPercentage/"+data);
  }
  getProductsBySubcatId(data) {   
    return this.http.post(this.ASM_SERVER_BASE_URL+"/client/getProductsBySubcatId", data);    
  }
  getProductsBySearchString(data) {   
    console.log("getProductsBySearchString", data);    
    return this.http.post(this.ASM_SERVER_BASE_URL+"/client/getProductsBySearchString", data);    
  }
  getProductsByBrand(data) {   
    console.log("getProductsBySearchString", data);    
    return this.http.get(this.ASM_SERVER_BASE_URL+"/client/getProductsByBrand/"+data);    
  }
  orderCheckOut(data) {
    return this.http.post(this.ASM_SERVER_BASE_URL+"/client/orderCheckOut",data);    
  }  
  customerOrdersHistory(data) {   
    return this.http.post(this.ASM_SERVER_BASE_URL+"/client/orders_history", data);    
  }
  getOrderDetails(data :any) {    
    console.log("getOrderDetails :", data);    
    return this.http.get(this.ASM_SERVER_BASE_URL+"/client/order_details/"+data);
  }
 
}
