import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ASMService } from '../asm.service';
import { ASMCustomerService } from '../asmCustomer.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  ordersHistoryList : any;
  orderDetailsList: any= [];
  billingAddress : any ={};
  shippingAddress : any= {};
  orderID : any = '';
  colors = [{ status: "submitted", color: "lightgreen" }, { status: "processing", color: "orange" }, { status: "closed", color: "pink" }, { status: "canceled", color: "palevioletred" }]
  constructor(private asmService : ASMService, public customerService: ASMCustomerService, private router: Router, private cartService: CartService) { }
  
  ngOnInit(): void {
    console.log("orderHistory");
    this.customerOrdersHistory();
  }
  getTheColor(status) {
    return this.colors.filter(item => item.status === status)[0].color;

  } 
  customerOrdersHistory(){      
    let customer_id = this.customerService.customer.customer_id;
    let order_details = {
      customer_id
    }
    console.log("customer_id in order details:", order_details)
    this.asmService.customerOrdersHistory(order_details).subscribe((data: any)=>{
      console.log("order Details Data:",data);
      console.log("ordersList :", data.ordersList);
      
      if(data.status=='success'){
        this.ordersHistoryList = data.ordersList
      }
    },
    error => {
      console.log(error);
    })    
  }
  orderDetails(order_id){
    this.orderID = order_id;
    console.log("order_id", order_id);
    this.asmService.getOrderDetails(order_id).subscribe((data:any)=>{     
      console.log("data:", data);
      this.orderDetailsList = data.orderList;
      this.billingAddress = data.billing_address;  
      this.shippingAddress = data.shipping_address;         
    }, error =>{
      console.log(error)
      console.log("error:", error.error)
    });
    
  }
  onLogout(){
    // localStorage.removeItem('username');
    localStorage.removeItem('customer');
    localStorage.removeItem('token'); 
    this.customerService.setCustomerInfo(null, null);
    this.router.navigate([`/home`]);
  }
  gotoTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
