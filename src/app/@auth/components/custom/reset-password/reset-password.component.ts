import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ApiResult } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup = new FormGroup({});
  show = true;
submit='Change password'


  confirmationValidator = (control: FormControl): { [s: string]: boolean} =>{
    const passControl = this.resetPasswordForm.get('password');
    if(!control.value){
      return { required :true}
    }
    else if(control.value  !== passControl.value){
      return { confirm: true, error:true};
      }

    };
    
  constructor(private fb : FormBuilder, private route: ActivatedRoute, private http:HttpClient) {
   this.resetPasswordForm = this.buildForm();
   }

  
  get password() { return this.resetPasswordForm.get('password'); }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword'); }

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log(email);
    console.log(token);
    if(email && token){
      this.resetPasswordForm.patchValue({
        email:email,
        token:token
      })
    }
  }

  buildForm():FormGroup{
    return this.fb.group({
      password:[null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      confirmPassword: [null, [Validators.required]],
      email:[null],
      token:[null]
    })
  }

  resetPass(){
    if(this.resetPasswordForm.valid){
      this.submit = "Resetting Password ..."
      this.http.post(`${environment.apiUrl}/api/v1/users/ResetPassword`,this.resetPasswordForm.value).subscribe((res:ApiResult) =>{
        if(res.success){
          this.show = false;
        }
        else{
          console.log(res);
        }
      })
    }
  }
}
