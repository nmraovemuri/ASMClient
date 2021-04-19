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
  constructor(private customerService: ASMCustomerService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.customer = localStorage.getItem("customer");    
    this.deliveryAddressForm = new FormGroup({
      
        // first_name: new FormControl('', Validators.required),
        // last_name: new FormControl('', Validators.required),
        // email_id: new FormControl('', [Validators.required, Validators.email]),
        // mobile: new FormControl('', Validators.required),
        // addr_field1: new FormControl('', Validators.required),
        // addr_field2: new FormControl('', Validators.required),
        // addr_field3: new FormControl('', Validators.required),
        // addr_field4: new FormControl('', Validators.required),
        // addr_field5: new FormControl('', Validators.required),
        // addr_field6: new FormControl('', Validators.required),
        // city: new FormControl('', Validators.required),
        // state: new FormControl('', Validators.required),
        // country: new FormControl('', Validators.required),
        // pin_code: new FormControl('',Validators.required),
        first_name: new FormControl('', ),
        last_name: new FormControl('', ),
        email_id: new FormControl('', ),
        mobile: new FormControl('', ),
        addr_field1: new FormControl('',),
        addr_field2: new FormControl('',),
        addr_field3: new FormControl('',),
        addr_field4: new FormControl('', ),
        addr_field5: new FormControl('', ),
        addr_field6: new FormControl('', Validators.required ),
        city: new FormControl('', ),
        state: new FormControl('',),
        country: new FormControl('',),
        pin_code: new FormControl('',),
      
    })
    //this.billingAddressForm = Object.assign({}, this.deliveryAddressForm.value);

  }
  // changeLocation(e) {
  //   console.log(e.target.value);
  // }
  FillBilling(deliveryAddressForm){
    if(deliveryAddressForm.customCheckbill==true)
    {
      this.deliveryAddressForm = Object.assign({}, this.billingAddressForm.value);
    }

  }
  onSubmit() {
    // this.resource = JSON.stringify(this.DeliveryAddressForm.value);
    // console.log("deliveryAddress :", this.resource);
    // this.resource2 = JSON.stringify(this.billingAddressForm.value);
    // console.log("BillingAddress :", this.resource2);    
    // customer_id, delivery_address, billing_address, cartList
  }
  submitYourOrder(){
      
    console.log("deliveryAddress :", this.deliveryAddressForm.value);
    console.log(" cart List", this.cartService.getCartList() );
    console.log("customer_id:", this.customerService.customer.customer_id);
    let customer_id = this.customerService.customer.customer_id;
    let delivery_address = this.deliveryAddressForm.value;
    delivery_address.state = "Telangana";
    delivery_address.country = "India";
    delivery_address.email_id = this.customerService.customer.email_id;
    let order_details = {customer_id,
                         delivery_address,
                         billing_address: delivery_address,
                         cartList  : this.cartService.getCartList() 
    }
    this.customerService.orderSubmit(order_details).subscribe((data: any)=>{
      console.log("user data is added:",data);
      if(data.status=='success'){
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
  
}
