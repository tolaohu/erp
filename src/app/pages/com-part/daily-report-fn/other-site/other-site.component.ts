import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyReportFNService } from '../daily-report-fn.service';
import { project } from '../../interface';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-other-site',
  templateUrl: './other-site.component.html',
  styleUrls: ['./other-site.component.scss'],
  providers:[DailyReportFNService]
})
export class OtherSiteComponent implements OnInit {
  show = false;
  processing = false;
  projectList: project[];
  companyList: any[];
  otherSiteForm: FormGroup = new FormGroup({});
  // testForm: FormGroup = new FormGroup({});
    constructor(private fb: FormBuilder, 
                private service: DailyReportFNService, 
                private toastrService: NbToastrService) {
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
  
  
  

//save methods

onOtherSiteSubmit(){
  if(this.otherSiteForm.valid){
    // console.log('val', JSON.stringify(this.genSummaryForm.value));
 this.processing = true;
      
    this.service.saveOtherSite(this.otherSiteForm.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(`Submitted successfuly`, `Success`);
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

  buildOtherSiteForm():FormGroup{
    return this.fb.group({
      projectId: [null, Validators.required],
      companyId: [null, Validators.required],
      qaqcreport: [null],
      logisticsReport: [null],
      sitePersonnelLogReport: [null],
      materialReport: [null],
      mocreport: [null]
    })
  }
 
  get qaqcreport(){
    return this.otherSiteForm.get('qaqcreport')
  }
  get logisticsReport(){
    return this.otherSiteForm.get('logisticsReport')
  }
  get sitePersonnelLogReport(){
    return this.otherSiteForm.get('sitePersonnelLogReport')
  }
  get materialReport(){
    return this.otherSiteForm.get('materialReport')
  }
  get mocreport(){
    return this.otherSiteForm.get('mocreport')
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
