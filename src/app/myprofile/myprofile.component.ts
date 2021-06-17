import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ASMCustomerService } from '../asmCustomer.service';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
 customer : any;
 customer_id : any;
 first_name  :string = '';
 last_name : string = '';
 mobile : number; 
 email_id : string = '';
 model :any={};
  constructor( public asmCustomerService:ASMCustomerService, private router: Router) {
    console.log("asmCustomerService:", this.asmCustomerService.customer);
    this.customer =  this.asmCustomerService.customer;
    this.customer_id = this.customer.customer_id;
    this.first_name = this.customer.first_name;      
    this.last_name = this.customer.last_name;
    this.mobile = this. customer.mobile;
    this.email_id = this.customer.email_id;
    
    this.model.customer_id = this.customer_id;
    this.model.first_name = this.first_name;
    this.model.last_name = this.last_name;
    this.model.mobile = this.mobile;
    this.model.email_id = this. email_id;
    
    console.log("customer log :", this.customer);    
   }

  ngOnInit(): void {
  }
  onLogout(){
    // localStorage.removeItem('username');
    localStorage.removeItem('customer');
    localStorage.removeItem('token'); 
    // this.asmCustomerService.setCustomerInfo(null, null);    
    this.router.navigate([`/home`]);    
  }
  updateUserProfile()
  {
    console.log("model:", this.model);
    this.asmCustomerService.updateCustomerProfile(this.model).subscribe((data:any)=>{
      // console.log("updated model data:",data);
      let closeModal = document.getElementById("closeModal");
      closeModal.click();
      // console.log("customer =",this.asmCustomerService.customer);
      this.asmCustomerService.customer.first_name = data.customerDetails.first_name;
      this.asmCustomerService.customer.last_name = data.customerDetails.last_name;
      this.asmCustomerService.customer.mobile = data.customerDetails.mobile;
      this.asmCustomerService.customer.email_id = data.customerDetails.email_id;
      this.customer = this.asmCustomerService.customer;
    },
    error => {
      console.log(error);
    })
  }
  gotoTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

}
