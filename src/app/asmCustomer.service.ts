import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ASMCustomerService{
  // ASM_SERVER_BASE_URL = "http://43.241.36.16:3000";
  ASM_SERVER_BASE_URL = "http://localhost:3000";
  //  ASM_SERVER_BASE_URL = "https://aswikamart.com";
  customer : any;
  token :any;
  constructor(private http:HttpClient) {
    // this.ASM_SERVER_BASE_URL = process.env.NODE_ENV === 'production' ? 'http://43.241.36.16:3000' : 'http://localhost:3000'
    // console.log("service url :", this.ASM_SERVER_BASE_URL);
   }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
  
  setCustomerInfo(customer, token){
    console.log("customer:", customer);
    console.log("token:", token);
    this.customer = customer;
    this.token = token;
  }
  getFirstName(){
    if(this.customer)
      return this.customer.first_name;
  }
  
  getMobile(){
    if(this.customer)
      return this.customer.mobile;
  }
  getEmail(){
    if(this.customer){
      return this.customer.email_id;
    }
  }
  getLastName(){
    if(this.customer){
      return this.customer.last_name;
    }
  }
  // **********REST API CALLS**************
  userLogin(data)  {
    // console.log("server login data:", data);
   // return this.http.get("http://localhost:3000/login/uid",data)
   return this.http.post(this.ASM_SERVER_BASE_URL+"/customer_signin", data)
  }
  checkEmailAlreadyExisted(data: any)
  {
    return this.http.post(this.ASM_SERVER_BASE_URL+"/checkEmailAlreadyExisted", data); 
  }
  customerSignup(customerDetails)  {
    let customHeaders = {
      headers: { 
                 "Content-Type" : "application/json",
                 "source_app" : "W"
               }
    }
    console.log("customHeaders :",  customHeaders);
    return this.http.post(this.ASM_SERVER_BASE_URL+"/customer_signup", customerDetails, customHeaders);
  }
  forgotPassword(data: any) {
    console.log("data:", data);
    return this.http.post(this.ASM_SERVER_BASE_URL+"/customer_forgot_password", data)
  }
  resetPassword(data: any) {
    // console.log("data:", data);
    return this.http.post(this.ASM_SERVER_BASE_URL+"/customer_reset_password", data)
  }
  changePassword(data: any) {
    // console.log("data:", data);
    // let customHeaders = {
    //   headers: { Authorization: "Bearer " + this.token }
    // }
    // console.log("customHeaders :",  customHeaders);
    let customHeaders = {
      headers: { 'Authorization' : "Bearer " + localStorage.getItem("token"), 
                 "Content-Type" : "application/json"
               }
    }
    console.log("customHeaders :",  customHeaders);
    return this.http.post(this.ASM_SERVER_BASE_URL+"/customer_change_password", data, customHeaders)
  }
  orderSubmit(data: any) {
    console.log("data:", data);
    let customHeaders = {
      headers: { 'Authorization' : "Bearer " + localStorage.getItem("token"), 
                 "Content-Type" : "application/json",
                 "source_app" : "W"
               }
    }
    console.log("customHeaders :",  customHeaders);
    return this.http.post(this.ASM_SERVER_BASE_URL+"/client/order_submit", data, customHeaders)
  }
  updateCustomerProfile(data){
    return this.http.post(this.ASM_SERVER_BASE_URL+"/updateCustomerProfile",data)
  }
  updateCustomerAddress( data){
    return this.http.post(this.ASM_SERVER_BASE_URL+"/updateCustomerAddress",data)
  }
  getCustomerShippingAddress(customer_id ){
    return this.http.get(this.ASM_SERVER_BASE_URL+`/get_customer_shipping_address/${customer_id}`);
  }
  
}
