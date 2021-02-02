import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'app/@auth/components/extras/auth-service';
import { project } from '../interface';
import { ConstructionReportService } from './construction-report.service';

@Component({
  selector: 'ngx-construction-report',
  templateUrl: './construction-report.component.html',
  styleUrls: ['./construction-report.component.scss'],
  providers:[ConstructionReportService]
})
export class ConstructionReportComponent implements OnInit {
  userRole: string[];
  show = false;
  projectList: project[];
  nationalityList: any[];
  stateList: any[];
  cityList: any[];
  staffList: any[];
  ctqList: any[];
  ctqAttendList: any[];
  ctqInitList: any[];
  ctqId:number; 
  vr:any;
  processing = false;
constructionReport: FormGroup = new FormGroup({});
replyReport : FormGroup = new FormGroup({});
acceptanceReport : FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, 
              private service: ConstructionReportService, 
              private toastrService: NbToastrService,
              private authService: AuthService) {
    this.constructionReport =this.buildForm();
    this.replyReport = this.buildReplyForm();
    this.acceptanceReport = this.buildAcceptForm();
   }

  

  ngOnInit(): void {
    this.getAllList();
   this.userRole = JSON.parse(this.authService.getRoles());
   console.log('roles',this.userRole);
   const date = new Date();
   this.constructionReport.patchValue({
    QueryDate: date
   })
  }

  getAllList(){
    this.service.getProject().subscribe(res=>{
      console.log('prs', res);
      this.projectList = res.data;
    });
    this.service.getNationality().subscribe(res=>{
      console.log('nat', res);
      this.nationalityList = res.data;
    });
    this.service.getState().subscribe(res=>{
      console.log('sta', res);
      this.stateList = res.data;
    });
    this.service.getCity().subscribe(res=>{
      // console.log('cit', res);
      this.cityList = res.data;
    });
    this.service.getStaff().subscribe(res=>{
      // console.log('stf', res);
      this.staffList = res.data;
    })
    this.service.getCtq().subscribe(res=>{
      // console.log('ctq', res);
      this.ctqList = res.data;
    })
    this.service.getAttendeeCtq().subscribe(res=>{
      console.log('Attctq', res);
      this.ctqAttendList = res.data;
    })
    this.service.getInitiatorCtq().subscribe(res=>{
      console.log('Initctq', res);
      this.ctqInitList = res.data;
    })
  }

  onReportSelect(val){
    console.log('selectedval', val);
    this.show =true;
  }

  onCtqSelect(val){
this.ctqId= val;
this.show= true;
  }

  onCountry(val){
    console.log('na val', val);
  }

  onState(val){
    console.log('st val', val);
  }

  buildReplyForm(): FormGroup{
    return this.fb.group({
      attentionReply: [null, Validators.required],
      attentionDate: [null]
    })
  }

  buildAcceptForm(): FormGroup{
    return this.fb.group({
      initiatorReply:[null, Validators.required],
      initiatorAcceptance:[0, Validators.required],
      initiatorReplyDate:[null]
    })
  }

  buildForm(): FormGroup{

    return this.fb.group({
      projectId:[null, Validators.required],
      CtqTitle:[null, Validators.required],
      CityId:[null, Validators.required],
      StateId:[null, Validators.required],
      CountryId:[null, Validators.required],
      CtqNumber:[null, Validators.required],
      QueryDate:[null, Validators.required],
      CtqDescription:[null, Validators.required],
      AttendeeId:[null, Validators.required],
      ReplyRequiredBy:[null, Validators.required],
      Priority:[0, Validators.required],
      DrawingFile:[null, Validators.required],
    })
  }
  onDrawingFile(event){
    console.log(event[0]);
    this.constructionReport.patchValue({
      DrawingFile:event[0]
    })
  }

  onSubmit(){
    if(this.constructionReport.valid){
      this.processing= true;
    // console.log('val', JSON.stringify(this.dailyReport.value));
      
    this.service.submit(this.constructionReport.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Report submitted successfuly`, `Success`);
        this.show = false;
        this.processing = false;
        this.constructionReport = this.buildForm();
      }
      else{
        this.toastrService.danger(`Report Submission Failed`, `Error`);
        this.processing = false;
      }
    })
    }
    else{
      this.toastrService.warning(`please fill the field mark (*)`, `Required Fields`);
    }
   }

   onReply(){
     const today = new Date(Date.now()).toJSON();
     console.log(today)
     this.replyReport.patchValue({
      attentionDate: today
     })
     if(this.replyReport.valid){
      this.processing = true;
       this.service.save(this.replyReport.value, 'attention', this.ctqId).subscribe(res=>{
         console.log (res);
         this.processing = false;
         if(res.success){
           this.show= false;
           this.toastrService.success(`Replied Successfully`)
         }
         else{
           this.toastrService.danger(`Relied Message Failed`)
         }
       })
     }
     else{
       this.toastrService.warning(`please fill the field mark (*)`, `Required Fields`);
     }
   }

   onAccept(){
    const today = new Date(Date.now()).toJSON();
    console.log(today)
    this.acceptanceReport.patchValue({
      initiatorReplyDate: today
    })
    if(this.acceptanceReport.valid){
      this.processing = true;
      this.service.save(this.acceptanceReport.value, 'InitiatorReply', this.ctqId).subscribe(res=>{
        console.log (res);
        this.processing = false;
        if(res.success){
          this.show= false;
          this.toastrService.success(`Acceptance Successfully`)
        }
        else{
          this.toastrService.danger(`Acceptance Failed`)
        }
      })
    }
    else{
      this.toastrService.warning(`please fill the field mark (*)`, `Required Fields`);
    }
   }

}
