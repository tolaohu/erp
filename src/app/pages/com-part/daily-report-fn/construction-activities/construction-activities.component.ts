import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyReportFNService } from '../daily-report-fn.service';
import { project } from '../../interface';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-construction-activities',
  templateUrl: './construction-activities.component.html',
  styleUrls: ['./construction-activities.component.scss'],
  providers:[DailyReportFNService]
})
export class ConstructionActivitiesComponent implements OnInit {
  show = false;
  processing = false;
  projectList: project[];
  companyList: any[];
  constructionActivitiesForm: FormGroup = new FormGroup({});
  // testForm: FormGroup = new FormGroup({});
    constructor(private fb: FormBuilder, 
                private service: DailyReportFNService, 
                private toastrService: NbToastrService) {
      this.constructionActivitiesForm = this.buildConstructionActivitiesForm();
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


onConstructionActiviesSubmit(){
  if(this.constructionActivitiesForm.valid){
    // console.log('val', JSON.stringify(this.genSummaryForm.value));
 this.processing = true;
      
    this.service.saveConstructionActivities(this.constructionActivitiesForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
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



  // anything form building


  buildConstructionActivitiesForm():FormGroup{
    return this.fb.group({
    projectId: [null, Validators.required],
    companyId: [null, Validators.required],
    constructionActivities:[null, [Validators.required, Validators.minLength(500)]],
    dailyProgress:[null, [Validators.required, Validators.minLength(500)]],
    followingDayPlan:[null, [Validators.required, Validators.minLength(500)]]
    })
  }

}
