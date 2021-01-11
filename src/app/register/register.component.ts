import { Component, OnInit } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import {AboutService} from './../about.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:any={};
  constructor(private aserv:AboutService, router : Router) { }

  ngOnInit(): void {
  }
  userRegister(user){
    console.log("the data value",user.value);
    this.aserv.createUser(user.value).subscribe((data)=>{
      console.log("user data is added:",data);
    })
  }
}
