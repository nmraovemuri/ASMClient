import { Component, OnInit } from '@angular/core';
import { ASMCustomerService } from '../asmCustomer.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  showModal: boolean;
  customer: any;
  deliveryAddressForm: FormGroup;
  billingAddressForm: FormGroup;
  resource: string;
  resource2: string;
  step: any = 1;
  tab1 : any;
  tab2 : any;
  tab3 : any;
  tab4 : any = false;
  orderId : any;
  locationList : any = [ 'Balangar', 'Chintal', 'Jagdigirigutta', 'Pragathi Nagar', 'Jeedimetla', 'Suchitra', 'Shapur', 'Gandi Misamma', 'Kompally']
  customer_address =  {
    first_name : '',
    last_name : '',
    mobile :'',
    email_id : '',
    addr_field1: '',
    addr_field2: '',
    addr_field3: '',
    addr_field4: '',
    addr_field5: '',
    addr_field6: '', 
    city: '',
    state:'',
    country :'',
    pin_code :''
    };
  boolean = true;
  // model: any ={};
  constructor(public customerService: ASMCustomerService,
               private router: Router, 
               private cartService: CartService) { }
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
     this.customer =  this.customerService.customer;
                 console.log("customer Data:",this.customer );
    this.deliveryAddressForm = new FormGroup({
      
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        email_id: new FormControl('', ),
        mobile: new FormControl('', ),
        addr_field1: new FormControl('',Validators.required),
        addr_field2: new FormControl('',Validators.required),
        addr_field3: new FormControl('',Validators.required),
        addr_field4: new FormControl('', Validators.required),
        addr_field5: new FormControl('', Validators.required),
        addr_field6: new FormControl('', Validators.required ),
        city: new FormControl('', Validators.required),
        state: new FormControl('',),
        country: new FormControl('',),
        pin_code: new FormControl('',Validators.required),
      
    })
    this.getCustomerShippingAddress();
   
    //this.billingAddressForm = Object.assign({}, this.deliveryAddressForm.value);

  }
  // changeLocation(e) {
  //   console.log(e.target.value);
  // }
  FillBilling(deliveryAddressForm){
    if(deliveryAddressForm.customCheckbill == true)
    {
      this.deliveryAddressForm = Object.assign({}, this.billingAddressForm.value);
    }

  }
  onSubmit(model:any) {
    
    console.log("customer_address:", this.customer_address);
    // this.resource = JSON.stringify(this.DeliveryAddressForm.value);
    // console.log("deliveryAddress :", this.resource);
    // this.resource2 = JSON.stringify(this.billingAddressForm.value);
    // console.log("BillingAddress :", this.resource2);    
    // customer_id, delivery_address, billing_address, cartList
  }
  submitYourOrder(){
    console.log("customer_address:", this.customer_address); 
    console.log("deliveryAddress :", this.deliveryAddressForm.value);
    console.log(" cart List", this.cartService.getCartList() );
    console.log("customer_id:", this.customerService.customer.customer_id);
    let customer_id = this.customerService.customer.customer_id;
    // let delivery_address = this.deliveryAddressForm.value;
    let delivery_address = this.customer_address;
    // delivery_address.state = "Telangana";
    // delivery_address.country = "India";
    // delivery_address.email_id = this.customerService.customer.email_id;
    let order_details = {customer_id,
                         delivery_address,
                         billing_address: delivery_address,
                         cartList  : this.cartService.getCartList() 
    }
    this.customerService.orderSubmit(order_details).subscribe((data: any)=>{
      console.log("user data is added:",data);
      if(data.status == 'success'){
        this.cartService.clearCart();
        this.orderId = data.order_id;
        this.tab4 = true;  
      }
    },
    error => {
      console.log(error);
    })    
  }
  gotoTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  getCustomerShippingAddress(){
    console.log("from getCustomerShippingAddress:");
    let customer_id = this.customerService.customer.customer_id;
    this.customerService.getCustomerShippingAddress(customer_id).subscribe((data:any)=>{
      console.log("getCustomerShippingAddress data:",data);
      
      
      // let customer =  this.customerService.customer;
      console.log("customer :",this.customer)

    // console.log("Temp Customer Address:", this.temp_customer_address);
      if(data.status == "failed" && data.key == 'DATA_NOT_AVAILABLE'){
        console.log("DATA_NOT_AVAILABLE :")
        this.customer_address.first_name = this.customer.first_name;
        this.customer_address.last_name = this.customer.last_name;
        this.customer_address.email_id = this.customer.email_id;
        this.customer_address.mobile = this.customer.mobile;
        this.customer_address.city = "Hyderabad";
        this.customer_address.state = "Telangana";
        this.customer_address.country = "India";

      }
      if(data.status == "success"){
        this.customer_address = data.customer_address; 
        console.log("customer_Address:",this.customer_address);
        this.customer_address.first_name =  data.customer_address.first_name;
        this.customer_address.last_name =  data.customer_address.last_name;
        this.customer_address.mobile  = data.customer_address.mobile;
        this.customer_address.email_id  = data.customer_address.email_id;        
        this.customer_address.addr_field1  = data.customer_address.addr_field1;
        this.customer_address.addr_field2  = data.customer_address.addr_field2;
        this.customer_address.addr_field3  = data.customer_address.addr_field3;
        this.customer_address.addr_field4  = data.customer_address.addr_field4;
        this.customer_address.addr_field5  = data.customer_address.addr_field5;
        this.customer_address.addr_field6  = data.customer_address.addr_field6;
        this.customer_address.city = data.customer_address.city;        
        this.customer_address.state = data.customer_address.state;   
        this.customer_address.country = data.customer_address.country;        
        this.customer_address.pin_code = data.customer_address.pin_code;        
        
      }
     },
    error => {
      console.log(error);

    })
  }
  
}
