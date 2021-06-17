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
  email_existed_error :string ='';
  check_email_existed_error : string = '';
  check_email_existed_success :string = '';
  locationList : any = [ 'Balangar', 'Chintal', 'Jagdigirigutta', 'Pragathi Nagar', 'Jeedimetla', 'Suchitra', 'Shapur', 'Gandi Misamma', 'Kompally']
  constructor(private asmCustomerService:ASMCustomerService, private router : Router) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      location: new FormControl('', [Validators.required] ),
      first_name : new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(55)] ),
      last_name : new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(40)] ),
      email_id  : new FormControl('',[Validators.required, Validators.email]),
      mobile : new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)] ),
      password : new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(8)] ),
      confirm_password : new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(8)] )

    })
  }
  get registrationFormControl() {
    return this.registrationForm.controls;
  }
  onSubmit(): void {
    console.log("reistration data:", this.registrationForm.value);
    this.asmCustomerService.customerSignup(this.registrationForm.value).subscribe((data:any)=>{
      console.log("user data is added:",data);
      if(data.status=='success'){
        console.log("sign up success:");
        //this.router.navigate['/signup-status'];
         this.router.navigate([`/signup-status`])
      }
    },
    HttpErrorResponse => {
      console.log(HttpErrorResponse);
      if(HttpErrorResponse.error.status == "failed" && HttpErrorResponse.error.error_type == "DUP_EMAIL_ID_ENTRY")
      {
        console.log( "Email ID:", HttpErrorResponse.error.message);
        this.email_existed_error = HttpErrorResponse.error.message;
      }
    })
  }
  gotoTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  checkEmailAlreadyExisted(): void{
    console.log("from checkEmailAlreadyExisted :")
    let data = {
      "email_id": this.registrationForm.value.email_id               
    }
    console.log(data);
    if(!data.email_id){
      this.check_email_existed_success = '';
      this.check_email_existed_error = '';
      return;
    }
    this.asmCustomerService.checkEmailAlreadyExisted(data).subscribe((data:any)=>{
      console.log("checkEmailAlreadyExisted status:",data);  
       if(data.status == "failed"){
         this.check_email_existed_error = data.message;
         this.check_email_existed_success = '';
       }
       else if(data.status == "success"){
         this.check_email_existed_success = data.message;
         this.check_email_existed_error = '';
       }
    })
  }

}
// signup_status

// signup_activation_succes
