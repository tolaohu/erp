import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyReportAltService } from './daily-report-alt.service';
import { project } from '../interface';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-daily-report-alt',
  templateUrl: './daily-report-alt.component.html',
  styleUrls: ['./daily-report-alt.component.scss'],
  providers: [DailyReportAltService]
})
export class DailyReportAltComponent implements OnInit {
  show = false;
  processing = false;
  nstage = 1;
  projectList: project[];
  companyList: any[];
  genSummaryForm: FormGroup = new FormGroup({});
  hseReportForm: FormGroup = new FormGroup({});
  dailyProgressMeasurementForm: FormGroup = new FormGroup({});
  constructionActivitiesForm: FormGroup = new FormGroup({});
  progressPicturesForm: FormGroup = new FormGroup({});
  otherSiteForm: FormGroup = new FormGroup({});
  // testForm: FormGroup = new FormGroup({});
    constructor(private fb: FormBuilder, 
                private service: DailyReportAltService, 
                private toastrService: NbToastrService) {
      this.genSummaryForm = this.buildGenralForm();
      this.hseReportForm = this.buildHseForm();
      this.dailyProgressMeasurementForm = this.buildProgressMeasurementForm();
      this.constructionActivitiesForm = this.buildConstructionActivitiesForm();
      this.progressPicturesForm = this.buildProgressPictureForm();
      this.otherSiteForm = this.buildOtherSiteForm();
     }
  
    ngOnInit(): void {
      this.service.getProject().subscribe(res=>{
        console.log('prs', res);
        this.projectList = res.data;
      });
      this.service.getCompanies().subscribe(res=>{
        console.log('com', res);
        this.companyList = res.data;
      });
    }
  
    onReportSelect(val){
      console.log('selectedval', val);
      this.show =true;
    }
  
   onNext(){
  this.nstage++;
   }
   onBack(){
     this.nstage--;
   }
  
   /**
   checkArray(){
     console.log('hse1', this.hseReports.value);
     console.log('hse2', this.hseReports.controls);
     console.log('hse3', this.hseReports.controls[0].get('title'));
     console.log('hse4', this.hseReports.controls[0].value);
     console.log('length',this.hseReports.length)
      //  this.hseReports.get('')
      if (this.hseReports.controls[0].pristine && (this.hseReports.length < 2)) {
        // this.dailyReport.patchValue({
        //   hseReport:null
        // })
        // this.hseReports.patchValue([null]);
        // this.hseReports.setValue([null]);
        this.dailyReport.get('hseReport').setValue([{'title':null}])
      } 
      else{
        this.dailyReport.get('hseReport').setValue(this.hseReports.value)
      }
   } */
  
 /***  onSubmit(){
    // this.service.sum(this.dailyReport.value)
    if(this.dailyReport.valid){
    // console.log('val', JSON.stringify(this.dailyReport.value));
      
    this.service.sum(this.dailyReport.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Report submitted successfuly`, `Success`);
        this.nstage = 1;
        this.show = false;
        this.dailyReport = this.buildForm();
      }
      else{
        this.toastrService.danger(`Report Submission Failed`, `Error`);
      }
    })
    }
    else{
      this.toastrService.warning(`please fill the field mark (*)`, `Required Fields`);
    }
   }  ***/
  // testbuildForm():FormGroup{
  //   return this.fb.group({
  //     hseReportt: this.fb.array([this.buildReportForm()])
  //   })
  // }
//save methods

onGeneralSummarySubmit(){
  
  if(this.genSummaryForm.valid){
    // console.log('val', JSON.stringify(this.genSummaryForm.value));
 this.processing = true;
      
    this.service.saveGen(this.genSummaryForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
        this.nstage = 2;
        this.show = false;
        this.processing = false;
        this.genSummaryForm = this.buildGenralForm();
      }
      else{
        this.processing = false;
        this.toastrService.danger(`Submission Failed`, `Error`);
      }
    })
    }
}

onHseReportSubmit(){
  if(this.hseReportForm.valid){
    // console.log('val', JSON.stringify(this.genSummaryForm.value));
 this.processing = true;
      
    this.service.saveHse(this.hseReportForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
        this.nstage = 3;
        this.show = false;
        this.processing = false;
        this.hseReportForm = this.buildHseForm();
      }
      else{
        this.processing = false;
        this.toastrService.danger(`Submission Failed`, `Error`);
      }
    })
    }
}

onConstructionActiviesSubmit(){
  if(this.constructionActivitiesForm.valid){
    // console.log('val', JSON.stringify(this.genSummaryForm.value));
 this.processing = true;
      
    this.service.saveConstructionActivities(this.constructionActivitiesForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
        this.nstage = 4;
        this.show = false;
        this.processing = false;
        this.constructionActivitiesForm = this.buildConstructionActivitiesForm();
      }
      else{
        this.processing = false;
        this.toastrService.danger(`Submission Failed`, `Error`);
      }
    })
    }
}

onProgressMeasurementSubmit(){
  if(this.dailyProgressMeasurementForm.valid){
    // console.log('val', JSON.stringify(this.genSummaryForm.value));
 this.processing = true;
      
    this.service.saveDailyProgressMeasurement(this.dailyProgressMeasurementForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
        this.nstage = 5;
        this.show = false;
        this.processing = false;
        this.dailyProgressMeasurementForm = this.buildProgressMeasurementForm();
      }
      else{
        this.processing = false;
        this.toastrService.danger(`Submission Failed`, `Error`);
      }
    })
    }
}

onProgressPictureSubmit(){
  if(this.progressPicturesForm.valid){
    // console.log('val', JSON.stringify(this.genSummaryForm.value));
 this.processing = true;
      
    this.service.saveProgressPictures(this.progressPicturesForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
        this.nstage = 6;
        this.show = false;
        this.processing = false;
        this.progressPicturesForm = this.buildProgressPictureForm();
      }
      else{
        this.processing = false;
        this.toastrService.danger(`Submission Failed`, `Error`);
      }
    })
    }
}

onOtherSiteSubmit(){
  if(this.otherSiteForm.valid){
    // console.log('val', JSON.stringify(this.genSummaryForm.value));
 this.processing = true;
      
    this.service.saveOtherSite(this.otherSiteForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
        this.nstage = 1;
        this.show = false;
        this.processing = false;
        this.otherSiteForm = this.buildOtherSiteForm();
      }
      else{
        this.processing = false;
        this.toastrService.danger(`Submission Failed`, `Error`);
      }
    })
    }
}

  // anything form building
  buildGenralForm(): FormGroup{
    return this.fb.group({
    projectId: [0],
    companyId: [0],
    generalSummary: [null]
    })
  }
  buildHseForm():FormGroup{
    return this.fb.group({
      srdrHSEReports:this.fb.array([this.buildReportForm()]),
      srdrHseReportAttachment:this.fb.group({
        permitToWork:[null],
        securityReport:[null]
      })
    })
  }

  buildProgressMeasurementForm():FormGroup{
    return this.fb.group({
      srdrProMeMaster:this.fb.group({
        projectId: [0],
        companyId: [0],
        progressAt: [null],
        constructionActual: [0],
        planned: [0]
      }),
      srdrProgressMeasurements:this.fb.array([this.buildDailyProgressMeasurementForm()]),
      srdrIssues:this.fb.array([this.buildDailyReportingIssues()]),
      srdrDelays:this.fb.array([this.buildDailyReportingDelays()])
    })
  }
  
  buildConstructionActivitiesForm():FormGroup{
    return this.fb.group({
    projectId: [0],
    companyId: [0],
    constructionActivities:[null],
    dailyProgress:[null],
    followingDayPlan:[null]
    })
  }

  buildProgressPictureForm():FormGroup{
    return this.fb.group({
    projectId: [0],
    companyId: [0],
    progressPictures: [null]
    })
  }

  buildOtherSiteForm():FormGroup{
    return this.fb.group({
      projectId: [0],
      companyId: [0],
      qaqcreport: [null],
      logisticsReport: [null],
      sitePersonnelLogReport: [null],
      materialReport: [null],
      mocreport: [null]
    })
  }
  
  
   buildForm(): FormGroup {
    return this.fb.group({
      projectId:[null, Validators.required],
      generalSummary:[null, Validators.required],
      hseReport: this.fb.array([this.buildReportForm()]),
      constructionActivities:[null, Validators.required],
      dailyProgress:[null, Validators.required],
      followingDayPlan:[null, Validators.required],
      progressAt:[null, Validators.required],
      constructionActual:[null, Validators.required],
      planned:[null, Validators.required],
      // dailyReportingProgressMeasurement: this.fb.array([this.buildDailyReportingProgressMeasurementForm()]),
      dailyReportingIssues: this.fb.array([this.buildDailyReportingIssues()]),
      dailyReportingDelays: this.fb.array([this.buildDailyReportingDelays()]),
      dailyReportingFileAttachments:this.buildFileAttachment()
    });
  }
  
  buildReportForm(): FormGroup  {
    return  this.fb.group({
      projectId:[0],
      companyId:[0],
      title: [],
      detailsStatistics:[],
      remarks:[]
    }) 
  }
  
  buildDailyProgressMeasurementForm(): FormGroup{
  return this.fb.group({
    activity:[null, Validators.required],
    cumProgressActual:[null, Validators.required],
    cumPlannedProgress:[null, Validators.required],
    remarks:[null, Validators.required],
  })
  }
  
  buildDailyReportingIssues(): FormGroup{
    return this.fb.group({
      challenges:[null],
      recommendations:[null]
    })
  }
  
  buildDailyReportingDelays(): FormGroup{
    return this.fb.group({
      descriptionOfDelay:[null],
      timeTaken:[null],
      cause:[null],
      responsible:[null]
    })
  }
  
  buildFileAttachment():FormGroup{
    return this.fb.group({
      permitToWork : [],
      securityReport: [],
      progressPictures:[],
      qaqcReport:[],
      logisticReport:[],
      sitePersonnelLogReport:[],
      materialReport:[],
      mocReport:[]
    })
  }
 
  
  /// new arrays created
  
  get srdrHSEReports(){
    return this.hseReportForm.get('srdrHSEReports') as FormArray;
  }
  get srdrProgressMeasurements(){
    return this.dailyProgressMeasurementForm.get('srdrProgressMeasurements') as FormArray;
  }
  get srdrIssues(){
    return this.dailyProgressMeasurementForm.get('srdrIssues') as FormArray;
  }
  get srdrDelays(){
    return this.dailyProgressMeasurementForm.get('srdrDelays') as FormArray;
  }
  
  
  addHse(): void{ 
    this.srdrHSEReports.push(this.buildReportForm())
  }
  
  addDailyReportingProgress(){
    this.srdrProgressMeasurements.push(this.buildDailyProgressMeasurementForm())
  }
  
  addDailyReportingIssues(){
    this.srdrIssues.push(this.buildDailyReportingIssues());
  }
  
  addDailyReportingDelays(){
    this.srdrDelays.push(this.buildDailyReportingDelays());
  }
   
  //files Changes
  
  // onFilesAdded(e){
  //   const fileList = e.target.files;
  //   console.log(fileList);
  //   var x = document.getElementsByClassName("custom-file-label");
  //     x[0].innerHTML = fileList[0].name;
  //     this.dailyReport.patchValue({
  //       dailyReportingFileAttachments:{
  //         mocReport:fileList
  //       }
  //     })
  // }
  
  onFileSelectedPW(event){
    console.log(event, 'pw');
    this.hseReportForm.patchValue({
      srdrHseReportAttachment:{
        permitToWork:event
      }
    })
  }
  onFileSelectedSR(event){
    console.log(event, 'sr');
    this.hseReportForm.patchValue({
      srdrHseReportAttachment:{
        securityReport:event
      }
    })
    
  }
  
  onFileSelectedPP(event){
    console.log(event);
    this.progressPicturesForm.patchValue({
        progressPictures:event
    })
  }
  onFileSelectedLR(event){
    console.log(event);
    this.otherSiteForm.patchValue({
      logisticsReport:event
    })
    console.log('other att', this.otherSiteForm.value)
  }
  onFileSelectedQAC(event){
    console.log(event);
    this.otherSiteForm.patchValue({
      qaqcreport:event
    })
    console.log('other att', this.otherSiteForm.value)
  }
  onFileSelectedSPL(event){
    console.log(event);
    this.otherSiteForm.patchValue({
        sitePersonnelLogReport:event
    })
    console.log('other att', this.otherSiteForm.value)
  }
  onFileSelectedMR(event){
    console.log(event);
    this.otherSiteForm.patchValue({
        materialReport:event
    })
    console.log('other att', this.otherSiteForm.value)
  }
  onFileSelectedMCR(event){
    console.log(event);
    this.otherSiteForm.patchValue({
      mocreport:event
    })
    console.log('other att', this.otherSiteForm.value)
  }
  }
  