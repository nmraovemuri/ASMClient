import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ASMCustomerService } from '../asmCustomer.service';

@Component({
  selector: 'app-change-user-password',
  templateUrl: './change-user-password.component.html',
  styleUrls: ['./change-user-password.component.css']
})
export class ChangeUserPasswordComponent implements OnInit {
  customer_id: any;
  changePasswordForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private asmCustomerService : ASMCustomerService,
    private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      this.customer_id = this.asmCustomerService.customer.customer_id; 
      console.log("customer_id :", this.customer_id);      
  });
  this.changePasswordForm = new FormGroup({
    old_password: new FormControl('', [Validators.required]),
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
  console.log("registration data:", this.changePasswordForm.value);
  let data = {
    "customer_id": this.customer_id,
    "old_password": this.changePasswordForm.get('old_password').value,
    "new_password": this.changePasswordForm.get('new_password').value,
    
    //"new_password2": this.changePasswordForm.value.new_password
  }
  
  this.asmCustomerService.changePassword(data).subscribe((_result:any)=>{
    console.log("reset password data is updated:",_result); 
    if(_result.status = "success"){
      localStorage.removeItem('customer');
      localStorage.removeItem('token');
      return this.router.navigate([`/reset_password_status`])
    }
  },
  error => {
    console.log(error);
  })
}

}
