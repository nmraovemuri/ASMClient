import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ASMCustomerService } from '../asmCustomer.service';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css']
})
export class MyAddressComponent implements OnInit {
  customer_address =  {
    first_name:'',
    last_name : '',
    email_id :'',
    mobile : '',
    addr_field1: '',
    addr_field2: '',
    addr_field3: '',
    addr_field4: '',
    addr_field5: '',
    addr_field6: '', 
    pin_code : ''
  };
  temp_customer_address =  {
    first_name:'',
    last_name : '',
    email_id :'',
    mobile : '',
    addr_field1: '',
    addr_field2: '',
    addr_field3: '',
    addr_field4: '',
    addr_field5: '',
    addr_field6: '', 
    pin_code : ''
  }
  customer_id: any;
  constructor( public asmCustomerService:ASMCustomerService, private router : Router) { 
    console.log("customer_address :", this.customer_address);
  } 

  ngOnInit(): void {
    console.log("customer_address :", this.customer_address);
    this.getCustomerShippingAddress();
  }
  onLogout(){
    // localStorage.removeItem('username');
    localStorage.removeItem('customer');
    localStorage.removeItem('token'); 
    this.asmCustomerService.setCustomerInfo(null, null);
    this.router.navigate([`/home`]);
  }
  gotoTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  getCustomerShippingAddress(){
    console.log("from getCustomerShippingAddress:");
    this.customer_id = this.asmCustomerService.customer.customer_id;
    this.asmCustomerService.getCustomerShippingAddress(this.customer_id).subscribe((data:any)=>{
    console.log("getCustomerShippingAddress data:",data);
    // this.customer_address = data.customer_address; 
      if(data.status == "failed" && data.key == 'DATA_NOT_AVAILABLE'){
        console.log("DATA_NOT_AVAILABLE :")
        let customer =  this.asmCustomerService.customer;
        console.log("customer :",customer)
        console.log("customer_address :",this.customer_address)
        this.customer_address.first_name = customer.first_name;
        this.customer_address.last_name = customer.last_name;
        this.customer_address.email_id = customer.email_id;
        this.customer_address.mobile = customer.mobile;

        // this.customer_address.addr_field1 = '';
      }
      if(data.status == "success"){
        console.log("DATA_AVAILABLE :")
        this.customer_address.first_name = data.customer_address.first_name;
        this.customer_address.last_name = data.customer_address.last_name;
        this.customer_address.email_id = data.customer_address.email_id;
        this.customer_address.mobile = data.customer_address.mobile;

        this.customer_address.addr_field1 = data.customer_address.addr_field1;
        this.customer_address.addr_field2 = data.customer_address.addr_field2;
        this.customer_address.addr_field3 = data.customer_address.addr_field3;
        this.customer_address.addr_field4 = data.customer_address.addr_field4;
        this.customer_address.addr_field5 = data.customer_address.addr_field5;
        this.customer_address.addr_field6 = data.customer_address.addr_field6;
        this.customer_address.pin_code = data.customer_address.pin_code;
      }
     },
    error => {
      console.log(error);

    })
  }
  showEditAddress(){
    console.log("show edit address:");
    this.temp_customer_address.first_name = this.customer_address.first_name;
    this.temp_customer_address.last_name = this.customer_address.last_name;
    this.temp_customer_address.email_id = this.customer_address.email_id;
    this.temp_customer_address.mobile = this.customer_address.mobile;

    this.temp_customer_address.addr_field1 = this.customer_address.addr_field1;
    this.temp_customer_address.addr_field2 = this.customer_address.addr_field2;
    this.temp_customer_address.addr_field3 = this.customer_address.addr_field3;
    this.temp_customer_address.addr_field4 = this.customer_address.addr_field4;
    this.temp_customer_address.addr_field5 = this.customer_address.addr_field5;
    this.temp_customer_address.addr_field6 = this.customer_address.addr_field6;
    this.temp_customer_address.pin_code = this.customer_address.pin_code;
  }
  updateUserAddress()
  {
    let customer =  this.asmCustomerService.customer;
    console.log("customer :",customer)

    console.log("Temp Customer Address:", this.temp_customer_address);
    this.temp_customer_address.first_name = customer.first_name;
    this.temp_customer_address.last_name = customer.last_name;
    this.temp_customer_address.email_id = customer.email_id;
    this.temp_customer_address.mobile = customer.mobile;
    console.log("Temp Customer Address:", this.temp_customer_address);

    let data = { customer_id : this.customer_id, 
                 customer_address : this.temp_customer_address}
    this.asmCustomerService.updateCustomerAddress(data).subscribe((data:any)=>{
      console.log("updated customer data:",data);
      
      let closeModal = document.getElementById("closeModal");
      closeModal.click();
      // console.log("customer =",this.asmCustomerService.customer);
      // this.asmCustomerService.customer.first_name = data.customerDetails.first_name;
      // this.asmCustomerService.customer.last_name = data.customerDetails.last_name;
      // this.asmCustomerService.customer.mobile = data.customerDetails.mobile;
      // this.asmCustomerService.customer.email_id = data.customerDetails.email_id;
      // this.customer = this.asmCustomerService.customer;
    },
    error => {
      console.log(error);
    })
  }
}
