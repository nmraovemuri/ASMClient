import { Component, OnInit } from '@angular/core';
import { Router,RouterModule} from '@angular/router';
import { AboutService } from './../about.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private aserv: AboutService, private router : Router) { }
 loginData :any ={};
  ngOnInit(): void {
  }
  userlogin(loginData){
    // console.log("User login data:",loginData.value);
     this.aserv.userLogin(loginData.value).subscribe((data)=>{
       console.log("data:",data);
      console.log("prsent user login data is :", data[0].token);
      console.log("token :",data[0].token);
      localStorage.setItem('username',data[0].usename);
       localStorage.setItem('token',data[0].token);
       this.router.navigate([`/home`]);
     //  let token = localStorage.getItem('token');
     //  console.log("Token:",token);
     },
     error => {
      console.log(error);
    })
   }

}
