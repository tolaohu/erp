import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyReportService } from './daily-report.service';
import { project } from '../interface';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss'],
  providers: [DailyReportService]
})
export class DailyReportComponent implements OnInit {
show = false;
nstage = 1;
projectList: project[];
dailyReport: FormGroup = new FormGroup({});
// testForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private service: DailyReportService, private toastrService: NbToastrService) {
    
    this.dailyReport = this.buildForm();
    // this.testForm = this.testbuildForm();
   }

  ngOnInit(): void {
    this.service.getProject().subscribe(res=>{
      console.log('prs', res);
      this.projectList = res.data;
    })
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
 }

 onSubmit(){
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
 }
// testbuildForm():FormGroup{
//   return this.fb.group({
//     hseReportt: this.fb.array([this.buildReportForm()])
//   })
// }
// anything form building
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
    dailyReportingProgressMeasurement: this.fb.array([this.buildDailyReportingProgressMeasurementForm()]),
    dailyReportingIssues: this.fb.array([this.buildDailyReportingIssues()]),
    dailyReportingDelays: this.fb.array([this.buildDailyReportingDelays()]),
    dailyReportingFileAttachments:this.buildFileAttachment()
  });
}

buildReportForm(): FormGroup  {
  return  this.fb.group({
    title: [],
    datailStatistics:[],
    remarks:[]
  }) 
}

buildDailyReportingProgressMeasurementForm(): FormGroup{
return this.fb.group({
  activity:[null, Validators.required],
  cumProgressActual:[null, Validators.required],
  cumPlannedProgress:[null, Validators.required],
  remarks:[null, Validators.required],
})
}

buildDailyReportingIssues(): FormGroup{
  return this.fb.group({
    challenges:[],
    recommendations:[]
  })
}

buildDailyReportingDelays(): FormGroup{
  return this.fb.group({
    descriptionOfDelay:[],
    timeTaken:[],
    cause:[],
    responsible:[]
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
//form building ends here

get hseReports() {
  return this.dailyReport.get('hseReport') as FormArray;
}
// get hseReports() {
//   return this.testForm.get('hseReportt') as FormArray;
// }

get dailyReportingProgressMeasurements(){
  return this.dailyReport.get('dailyReportingProgressMeasurement') as FormArray;
}

get dailyReportingIssue(){
  return this.dailyReport.get('dailyReportingIssues') as FormArray;
}

get dailyReportingDelay(){
  return this.dailyReport.get('dailyReportingDelays') as FormArray;
}

addHse(): void{
  this.hseReports.push(this.buildReportForm())
}

addDailyReportingProgress(){
  this.dailyReportingProgressMeasurements.push(this.buildDailyReportingProgressMeasurementForm())
}

addDailyReportingIssues(){
  this.dailyReportingIssue.push(this.buildDailyReportingIssues());
}

addDailyReportingDelays(){
  this.dailyReportingDelay.push(this.buildDailyReportingDelays());
}

//files Changes

onFilesAdded(e){
  const fileList = e.target.files;
  console.log(fileList);
  var x = document.getElementsByClassName("custom-file-label");
    x[0].innerHTML = fileList[0].name;
    this.dailyReport.patchValue({
      dailyReportingFileAttachments:{
        mocReport:fileList
      }
    })
}

onFileSelectedPW(event){
  console.log(event, 'pw');
  this.dailyReport.patchValue({
    dailyReportingFileAttachments:{
      permitToWork:event
    }
  })
}
onFileSelectedSR(event){
  console.log(event, 'sr');
  this.dailyReport.patchValue({
    dailyReportingFileAttachments:{
      securityReport:event
    }
  })
  
}

onFileSelectedPP(event){
  console.log(event);
  this.dailyReport.patchValue({
    dailyReportingFileAttachments:{
      progressPictures:event
    }
  })
}
onFileSelectedLR(event){
  console.log(event);
  this.dailyReport.patchValue({
    dailyReportingFileAttachments:{
      logisticReport:event
    }
  })
}
onFileSelectedQAC(event){
  console.log(event);
  this.dailyReport.patchValue({
    dailyReportingFileAttachments:{
      qaqcReport:event
    }
  })
}
onFileSelectedSPL(event){
  console.log(event);
  this.dailyReport.patchValue({
    dailyReportingFileAttachments:{
      sitePersonnelLogReport:event
    }
  })
}
onFileSelectedMR(event){
  console.log(event);
  this.dailyReport.patchValue({
    dailyReportingFileAttachments:{
      materialReport:event
    }
  })
}
onFileSelectedMCR(event){
  console.log(event);
  this.dailyReport.patchValue({
    dailyReportingFileAttachments:{
      mocReport:event
    }
  })
}
}
