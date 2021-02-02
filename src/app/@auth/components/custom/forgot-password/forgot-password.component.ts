import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
submit='Request password'
  submitted = false;
  show = true;

  requestPasswordForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private http : HttpClient) { 
    this.requestPasswordForm = this.buildForm();
  }

  
  get email() { return this.requestPasswordForm.get('email'); }

  ngOnInit(): void {
  }

  buildForm():FormGroup{
    return this.fb.group({
      email:[null, [Validators.required, Validators.email]]
    })
  }

  onSubmit(){
    if(this.requestPasswordForm.valid){
      this.submit = "Requesting ..."
      this.submitted=true;
      this.http.post(`${environment.apiUrl}/api/v1/users/restorepassword?email=${this.requestPasswordForm.value.email}`,this.requestPasswordForm.value).subscribe((res:ApiResult) =>{
        if(res.success){
          this.show = false;
          this.submitted = false;
        }
        else{
          console.log(res);
        }
      })
    }
  }
}

export interface ApiResult {
message:string;
success:boolean;
data:string[];
}