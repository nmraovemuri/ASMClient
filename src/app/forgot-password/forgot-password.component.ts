import { Component, OnInit } from '@angular/core';
import { ASMCustomerService} from '../asmCustomer.service';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  forgotForm : FormGroup;
  response :any ={}
  forgot={};
  loginFail :boolean =false;
  mail_id_not_activated: boolean = false;
  
  constructor(public asmCustomerService: ASMCustomerService, private router : Router) { }
  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email_id  : new FormControl('',[Validators.required, Validators.email]),
      
    })
  }
  onSubmit(): void {
    console.log("forgotForm data:", this.forgotForm.value);
    this.asmCustomerService.forgotPassword(this.forgotForm.value).subscribe((data)=>{
      console.log("user data is added:",data);   
      this.response = data;
      if(this.response.status == "failed" && this.response.key == "EMAIL_ID_NOT_VERIFIED" ){
        this.mail_id_not_activated = true;
      }
      // key: "EMAIL_ID_NOT_VERIFIED"
      // message: "Your email id verification is not completed"
      // status: "failed"
      if(this.response.status == "success"){
        this.router.navigate([`/forgot-password-status`]);
      }
    },
    error => {
      console.log(error);
      this.loginFail  =true;
    })
  }

}
