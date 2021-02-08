import { Component, OnInit } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import {ASMService} from '../asm.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:any={};
  constructor(private asmService:ASMService, router : Router) { }

  ngOnInit(): void {
  }
  userRegister(user){
    console.log("the data value",user.value);
    this.asmService.createUser(user.value).subscribe((data)=>{
      console.log("user data is added:",data);
    })
  }
}
