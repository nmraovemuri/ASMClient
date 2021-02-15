import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ASMCustomerService } from '../asmCustomer.service';
import { ConfirmedValidator } from '../share/password.validator';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  customer_id: any;
  resetForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private asmCustomerService : ASMCustomerService,
              private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.customer_id = params.customer_id; 
      console.log("customer_id :", this.customer_id);      
  });
  this.resetForm = new FormGroup({
    new_password: new FormControl('', [Validators.required,Validators.minLength(6), Validators.maxLength(8)]),
    confirm_password : new FormControl('',[Validators.required,Validators.minLength(6), Validators.maxLength(8)]),
  },{ validators: this.checkPasswords });//{validators :PasswordValidator}
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  const password = group.get('new_password').value;
  const confirmPassword = group.get('confirm_password').value;

  return password === confirmPassword ? null : { notSame: true }     
}
onSubmit(): void {
  console.log("registration data:", this.resetForm.value);
  let data = {
    "customer_id": this.customer_id,
    "new_password": this.resetForm.get('new_password').value,
    "new_password2": this.resetForm.value.new_password
  }
  
  this.asmCustomerService.resetPassword(data).subscribe((_result:any)=>{
    console.log("reset password data is updated:",_result); 
    if(_result.status = "success"){
      return this.router.navigate([`/reset_password_status`])
    }
  },
  error => {
    console.log(error);
  })
}

}
