import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ASMCustomerService } from '../asmCustomer.service';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css']
})
export class MyAddressComponent implements OnInit {

  constructor( public asmCustomerService:ASMCustomerService, private router : Router) { } 

  ngOnInit(): void {
  }
  onLogout(){
    // localStorage.removeItem('username');
    localStorage.removeItem('customer');
    localStorage.removeItem('token'); 
    this.asmCustomerService.setCustomerInfo(null, null);
    this.router.navigate([`/home`]);
  }

}
