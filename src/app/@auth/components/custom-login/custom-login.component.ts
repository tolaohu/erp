import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { EMAIL_PATTERN } from '../constants';
import { getDeepFromObject } from '../../helpers';
import { AuthService } from '../extras/auth-service';
import { AuthState } from 'app/@auth/store';
import { Store } from '@ngrx/store';
import * as fromAuthAction from '../../store/auth.actions'

@Component({
  selector: 'ngx-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss']
})
export class CustomLoginComponent implements OnInit {

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  loginForm: FormGroup;
  alive: boolean = true;
  log="Log In"
  
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    protected cd: ChangeDetectorRef,
    protected themeService: NbThemeService,
    private fb: FormBuilder,
    protected router: Router,
    private http: HttpClient,
    private service: AuthService,
    private store: Store<AuthState>) { }

  ngOnInit(): void {  
  const emailValidators = [
    Validators.pattern(EMAIL_PATTERN),
  ];
  this.isEmailRequired && emailValidators.push(Validators.required);

  const passwordValidators = [
    Validators.minLength(this.minLength),
    Validators.maxLength(26),
  ];
  this.isPasswordRequired && passwordValidators.push(Validators.required);

  this.loginForm = this.fb.group({
    email: this.fb.control('', [...emailValidators]),
    password: this.fb.control('', [...passwordValidators]),
    // rememberMe: this.fb.control(false),
  });
  }

  onLogin():void{
    if(this.loginForm.valid){
      this.log = "Logging In ..."
    this.service.login(this.loginForm.value).subscribe(res=>{
      console.log(res);
      if(res.token){
      this.store.dispatch(fromAuthAction.loadAuthsSuccess({data:res}))
      this.messages.push('succesful');
      this.service.setToken( res.token);
      this.service.setTokenExpirationDate(res.expiration);
      this.service.setRoles(res.userRoles);
      this.router.navigate([`/pages`])
    }
    else{
      this.errors.push(res);
    }

    })
  }
  else{
    this.log = "Log In";
    this.errors.push('Something went wrong');
    this.errors.push('please fill in correct details');
  }
  }

  getConfigValue(key: string): any {
    return getDeepFromObject({}, key, null);
  }

  // private tokenExpired(token: string) {
  //   const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  //   return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  // }
  
}
