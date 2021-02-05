import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyReportFNService } from '../daily-report-fn.service';
import { project } from '../../interface';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-progress-pictures',
  templateUrl: './progress-pictures.component.html',
  styleUrls: ['./progress-pictures.component.scss'],
  providers:[DailyReportFNService]
})
export class ProgressPicturesComponent implements OnInit {
  show = false;
  processing = false;
  projectList: project[];
  companyList: any[];
  progressPicturesForm: FormGroup = new FormGroup({});
  // testForm: FormGroup = new FormGroup({});
    constructor(private fb: FormBuilder, 
                private service: DailyReportFNService, 
                private toastrService: NbToastrService) {
      this.progressPicturesForm = this.buildProgressPictureForm();
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

onProgressPictureSubmit(){
  if(this.progressPicturesForm.valid){
    // console.log('val', JSON.stringify(this.genSummaryForm.value));
 this.processing = true;
      
    this.service.saveProgressPictures(this.progressPicturesForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
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

  // anything form building
  buildProgressPictureForm():FormGroup{
    return this.fb.group({
    projectId: [null, Validators.required],
    companyId: [null, Validators.required],
    progressPictures: [null, Validators.required],
    description:[null, Validators.minLength(500)]
    })
  }
 
    
  onFileSelectedPP(event){
    console.log(event);
    this.progressPicturesForm.patchValue({
        progressPictures:event
    })
  }
}
