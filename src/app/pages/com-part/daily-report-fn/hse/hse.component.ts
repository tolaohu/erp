import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyReportFNService } from '../daily-report-fn.service';
import { project } from '../../interface';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-hse',
  templateUrl: './hse.component.html',
  styleUrls: ['./hse.component.scss'],
  providers:[DailyReportFNService]
})
export class HseComponent implements OnInit {
  show = false;
  processing = false;
  projectList: project[];
  companyList: any[];
  hseReportForm: FormGroup = new FormGroup({});
  // testForm: FormGroup = new FormGroup({});
    constructor(private fb: FormBuilder, 
                private service: DailyReportFNService, 
                private toastrService: NbToastrService) {
      this.hseReportForm = this.buildHseForm();
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
 
  
//save methods

onHseReportSubmit(){
  if(this.hseReportForm.valid){
    // console.log('val', JSON.stringify(this.genSummaryForm.value));
 this.processing = true;
      
    this.service.saveHse(this.hseReportForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
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



  // anything form building

  buildHseForm():FormGroup{
    return this.fb.group({
      srdrHSEReports:this.fb.array([this.buildReportForm()]),
      srdrHseReportAttachment:this.fb.group({
        permitToWork:[null,  Validators.required],
        securityReport:[null,  Validators.required]
      })
    })
  }

  
  buildReportForm(): FormGroup  {
    return  this.fb.group({
      projectId:[null, Validators.required],
      companyId:[null, Validators.required],
      title: [null, Validators.required],
      detailsStatistics:[null, Validators.required],
      remarks:[null, [Validators.minLength(250)]]
    }) 
  }
  
  
  /// new arrays created
  
  get srdrHSEReports(){
    return this.hseReportForm.get('srdrHSEReports') as FormArray;
  }
  
  
  addHse(): void{ 
    this.srdrHSEReports.push(this.buildReportForm())
  }

  removeHse(index){
    this.srdrHSEReports.removeAt(index)
    }
  
 
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

}
