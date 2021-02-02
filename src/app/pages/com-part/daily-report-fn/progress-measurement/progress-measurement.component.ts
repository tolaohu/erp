import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyReportFNService } from '../daily-report-fn.service';
import { project } from '../../interface';
import { NbToastrService } from '@nebular/theme';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-progress-measurement',
  templateUrl: './progress-measurement.component.html',
  styleUrls: ['./progress-measurement.component.scss'],
  providers:[DailyReportFNService]
})
export class ProgressMeasurementComponent implements OnInit {
  show = false;
  processing = false;
  projectList: project[];
  companyList: any[];
  dailyProgressMeasurementForm: FormGroup = new FormGroup({});
  // testForm: FormGroup = new FormGroup({});
    constructor(private fb: FormBuilder, 
                private service: DailyReportFNService, 
                private toastrService: NbToastrService) {
      this.dailyProgressMeasurementForm = this.buildProgressMeasurementForm();
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
      console.log(this.srdrIssues.controls[this.srdrIssues.length - 1].get('challenges'))
    }

//save methods

onProgressMeasurementSubmit(){
  this.srdrIssues.get('challenges');
  if(this.dailyProgressMeasurementForm.valid){
    // console.log('val', JSON.stringify(this.genSummaryForm.value)); 
 this.processing = true;
      
    this.service.saveDailyProgressMeasurement(this.dailyProgressMeasurementForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
        this.show = false;
        this.processing = false;
        this.dailyProgressMeasurementForm = this.buildProgressMeasurementForm();
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
        this.toastrService.danger(error.error.errors[0] , `Error Submission Failed`);
      }})
    }
}


  // anything form building

  buildProgressMeasurementForm():FormGroup{
    return this.fb.group({
      srdrProMeMaster:this.fb.group({
        projectId: [null, Validators.required],
        companyId: [null, Validators.required],
        progressAt: [null, Validators.required],
        constructionActual: [null, Validators.required],
        planned: [null, Validators.required]
      }),
      srdrProgressMeasurements:this.fb.array([this.buildDailyProgressMeasurementForm()]),
      srdrIssues:this.fb.array([this.buildDailyReportingIssues()]),
      srdrDelays:this.fb.array([this.buildDailyReportingDelays()])
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
      challenges:[null, Validators.required],
      recommendations:[null, Validators.required]
    })
  }
  
  buildDailyReportingDelays(): FormGroup{
    return this.fb.group({
      descriptionOfDelay:[null, Validators.required],
      timeTakenFrom:[null],
      timeTakenTo:[null],
      timeTaken:[null, Validators.required],
      cause:[null, Validators.required],
      responsible:[null, Validators.required]
    })
  }
  
  
  /// new arrays created
  
 
  get srdrProgressMeasurements(){
    return this.dailyProgressMeasurementForm.get('srdrProgressMeasurements') as FormArray;
  }
  get srdrIssues(){
    return this.dailyProgressMeasurementForm.get('srdrIssues') as FormArray;
  }
  get srdrDelays(){
    return this.dailyProgressMeasurementForm.get('srdrDelays') as FormArray;
  }

  get challenges(){
    return this.srdrIssues.controls[this.srdrIssues.length - 1].get('challenges')
  }

  get recommendations(){
    return this.srdrIssues.controls[this.srdrIssues.length - 1].get('recommendations')
  }

  get delay(){
    return this.srdrDelays.controls[this.srdrDelays.length - 1].get('descriptionOfDelay')
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
   
  removeDailyReportingProgress(index){
    this.srdrProgressMeasurements.removeAt(index);
  }
  removeDailyReportingIssues(index){
    this.srdrIssues.removeAt(index);
  }
  removeDailyReportingDelays(index){
    this.srdrDelays.removeAt(index);
  }
}
