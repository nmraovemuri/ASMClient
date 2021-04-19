import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ASMService } from '../asm.service';
import { ASMCustomerService } from '../asmCustomer.service';
import { CartService } from '../cart.service';
import { FormGroup,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: []; 
  showModal: boolean;
  customer : any;
  loginData :any ={};
  customerLoginData : any ={};
  registrationForm : FormGroup;
  user:any={};
  constructor(public asmService : ASMService,
              private asmCustomerService:ASMCustomerService,
              private router:Router,
              public cartService: CartService) {  
     console.log("cart items are displayed");
     console.log("getCartList :",this.getCartList());   
  }
  ngOnInit(): void {   
    window.scrollTo(0, 0);
    this.customer = localStorage.getItem("customer"); 
    // this.registrationForm = new FormGroup({
    //   first_name : new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(55)] ),
    //   last_name : new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(55)] ),
    //   email_id  : new FormControl('',[Validators.required, Validators.email]),
    //   mobile : new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)] ),
    //   password : new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(8)] ),
    //   confirm_password : new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(8)] )

    // })
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

userlogin(loginData){
  // console.log("User login data:",loginData.value);
   this.asmCustomerService.userLogin(loginData.value).subscribe((data:any)=>{
    console.log("data:",data);
    this.customerLoginData = data;
     console.log("status data:", this.customerLoginData.status);
    console.log("customer:", this.customerLoginData.customer);
    console.log("Token:", this.customerLoginData.token);
    if(data.status = "success"){
      this.asmCustomerService.setCustomerInfo(data.customer,data.token);
    }
     localStorage.setItem('customer', this.customerLoginData.customer.first_name);
     localStorage.setItem('token', this.customerLoginData.token);
     this.router.navigate([`/checkout`]);     
   },
  error => {
    console.log(error);
  })
}
checkLogin(){
  // if(typeof  "this.customer"=="string")
  console.log("from checkLogin:", this.customer);
  console.log(this.customer);
  console.log(this.asmCustomerService.token);
  
  if(this.asmCustomerService.token){
    this.showModal = false;
    console.log("if block");      
    return this.router.navigate([`/checkout`]);   
  }    
  else{
    console.log("else block");      
    this.showModal = true; 
    // console.log(this.showModal);
  }
}
onClose(){
  this.showModal = false;
 }
//  onSubmit(): void {
//   console.log("reistration data:", this.registrationForm.value);
//   this.asmCustomerService.customerSignup(this.registrationForm.value).subscribe((data)=>{
//     console.log("user data is added:",data);
//     if(data[0].status=='success'){
//       console.log("sign up success:");
//       //this.router.navigate['/signup-status'];
//        this.router.navigate([`/signup-status`])
//     }
//   },
//   error => {
//     console.log(error);
//   })
// }
}
