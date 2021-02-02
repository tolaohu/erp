import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'ngx-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers:[RegistrationService]
})
export class RegistrationComponent implements OnInit {
  show = false;
  processing = false;
  registrationForm: FormGroup = new FormGroup({});
  companyList:any[];
  roleList:any[];

  // updateConfirmValidator(){
  //   Promise.resolve().then(()=>
  //   this.registrationForm.controls.confirmPassword.updateValueAndValidity());
  // }

  confirmationValidator = (control: FormControl): { [s: string]: boolean} =>{
    const passControl = this.registrationForm.get('password');
    if(!control.value){
      return { required :true}
    }
    else if(control.value  !== passControl.value){
      return { confirm: true, error:true};
      }

    };
  
    constructor(private fb: FormBuilder, 
                private service: RegistrationService, 
                private toastrService: NbToastrService) {
      this.registrationForm = this.buildRegistrationForm();
     }
  
     getData(){
      this.service.getCompanies().subscribe(res=>{
        this.companyList = res.data;
      });
      
      this.service.getRoles().subscribe(res=>{
        this.roleList = res.data;
      })
     }
    ngOnInit(): void {
      this.getData();
    }
  
 
//save methods

onSubmit(){
  
  if(this.registrationForm.valid){
    console.log('val', JSON.stringify(this.registrationForm.value));
 this.processing = true;
      
    this.service.submit(this.registrationForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
        this.show = false;
        this.processing = false;
        this.registrationForm = this.buildRegistrationForm();
      }
      else{
        this.processing = false;
        this.toastrService.danger(`Submission Failed`, `Error`);
      }
    },
      (error:HttpErrorResponse)=>{
        console.log('com err', error)
        if(error.error.success == false){
          this.processing = false;
          this.toastrService.danger(error.error.errors[1] , `Error Submission Failed`);
        }
      }
    )
    }
}

  // anything form building
  buildRegistrationForm(): FormGroup{
    return this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    firstName: [null,Validators.required],
    lastName: [null,Validators.required],
    staffNumber:[null, Validators.required],
    phoneNumber: [null,[Validators.required, Validators.pattern('[0-9]{11}')]],
    password: [null,[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
    confirmPassword: [null, [Validators.required, this.confirmationValidator]],
    roleId:[null, Validators.required],
    companyId:[null, Validators.required]
    })
  }

  
}
