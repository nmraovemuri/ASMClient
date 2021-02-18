import { Component, OnInit } from '@angular/core';
import { Router,RouterModule} from '@angular/router';
import { ASMCustomerService } from '../asmCustomer.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private asmCustomerService: ASMCustomerService, private router : Router) { }
 loginData :any ={};
 customerLoginData : any ={};
  ngOnInit(): void {
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
       this.router.navigate([`/home`]);     
     },
    error => {
      console.log(error);
    })
  }

}
