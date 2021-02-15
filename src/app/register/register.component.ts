import { Component, OnInit } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { ASMCustomerService } from '../asmCustomer.service';
import { FormGroup,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm : FormGroup;
  user:any={};
  constructor(private asmCustomerService:ASMCustomerService, private router : Router) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      first_name : new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(55)] ),
      last_name : new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(55)] ),
      //userName : new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(8)] ),
      email_id  : new FormControl('',[Validators.required, Validators.email]),
      mobile : new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)] ),
      password : new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(8)] ),
      confirm_password : new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(8)] )

    })
  }
  onSubmit(): void {
    console.log("reistration data:", this.registrationForm.value);
    this.asmCustomerService.customerSignup(this.registrationForm.value).subscribe((data)=>{
      console.log("user data is added:",data);
      if(data[0].status=='success'){
        console.log("sign up success:");
        //this.router.navigate['/signup-status'];
         this.router.navigate([`/signup-status`])
      }
    })
  }

}
// signup_status

// signup_activation_succes
