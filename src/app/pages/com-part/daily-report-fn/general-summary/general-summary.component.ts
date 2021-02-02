import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyReportFNService } from '../daily-report-fn.service';
import { project } from '../../interface';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-general-summary',
  templateUrl: './general-summary.component.html',
  styleUrls: ['./general-summary.component.scss'],
  providers:[DailyReportFNService]
})
export class GeneralSummaryComponent implements OnInit {
  show = false;
  processing = false;
  projectList: project[];
  companyList: any[];
  genSummaryForm: FormGroup = new FormGroup({});
    constructor(private fb: FormBuilder, 
                private service: DailyReportFNService, 
                private toastrService: NbToastrService) {
      this.genSummaryForm = this.buildGenralForm();
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

onGeneralSummarySubmit(){
  
  if(this.genSummaryForm.valid){
    // console.log('val', JSON.stringify(this.genSummaryForm.value));
 this.processing = true;
      
    this.service.saveGen(this.genSummaryForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
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

  // anything form building
  buildGenralForm(): FormGroup{
    return this.fb.group({
    projectId: [null, Validators.required],
    companyId: [null, Validators.required],
    generalSummary: [null, [Validators.required, Validators.minLength(500)]]
    })
  }

  
}
