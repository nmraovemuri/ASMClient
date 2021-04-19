import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ASMCustomerService } from '../asmCustomer.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor( public asmCustomerService:ASMCustomerService, private router: Router) { }


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
