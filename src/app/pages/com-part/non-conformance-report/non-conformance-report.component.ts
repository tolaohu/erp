import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { project } from '../interface';
import { NonConstructionReportService } from './non-construction-report.service';

@Component({
  selector: 'ngx-non-conformance-report',
  templateUrl: './non-conformance-report.component.html',
  styleUrls: ['./non-conformance-report.component.scss'],
  providers: [NonConstructionReportService]
})
export class NonConformanceReportComponent implements OnInit {
  show = false;
  processing = false;
  projectList: project[];
  nationalityList: any[];
  stateList: any[];
  cityList: any[];
  supplierList: any[];

  nonConformanceReport : FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, 
    private service :NonConstructionReportService, 
    private toastrService: NbToastrService,
    ) {
      this.nonConformanceReport = this.buildNonConformanceForm();
    }

  ngOnInit(): void {
    this.getAllList();
  }

  onReportSelect(val){
    console.log('selectedval', val);
    this.show =true;
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
      console.log('cit', res);
      this.cityList = res.data;
    });
    this.service.getSupplierr().subscribe(res=>{
      console.log('supp', res);
      this.supplierList = res.data;
    });
  }

  buildNonConformanceForm(): FormGroup{
    const date = new Date();
    return this.fb.group({
      Title:[null, Validators.required],
      ProjectId:[null, Validators.required],
      CountryId:[null, Validators.required],
      StateId:[null, Validators.required],
      CityId:[null, Validators.required],
      Description:[null, Validators.required],
      AreaModuleNumber:[null, Validators.required],
      DrawingReferenceNumber:[null, Validators.required],
      TagNumber:[null, Validators.required],
      ResponseDate:[date, Validators.required],
      Item:[null, Validators.required],
      SystemsSubSystems:[null, Validators.required],
      SupplierId:[null, Validators.required],
      ReqEngApproval:['false'],
      DocumentReqViolated:[null, Validators.required],
      DrawingFile:[null],
      NCRImages:[null],
      DescriptionDocuments:[null],
      DocumentNumber:[null, Validators.required],
      // descriptionNonConformance:[null, Validators.required]
    })
  }

  
  onDrawingFile(event){
    console.log(event[0]);
    this.nonConformanceReport.patchValue({
      DrawingFile:event[0]
    })
  }
  
  onNCRImages(event){
    console.log(event[0]);
    this.nonConformanceReport.patchValue({
      NCRImages:event[0]
    })
  }
  
  onDescriptionDocuments(event){
    console.log(event[0]);
    this.nonConformanceReport.patchValue({
      DescriptionDocuments:event[0]
    })
  }

  onSubmit(){
    if(this.nonConformanceReport.valid){
      this.processing= true;
    console.log('val', JSON.stringify(this.nonConformanceReport.value));
      
    this.service.submit(this.nonConformanceReport.value).subscribe(res=>{
      console.log('res api', res);
      if(res.success){
        this.toastrService.show(res.message, `Success`);
        this.show = false;
        this.processing = false;
        this.nonConformanceReport = this.buildNonConformanceForm();
      }
      else{
        this.toastrService.danger(`Report Submission Failed`, `Error`);
        this.processing = false;
      }
    },
    (error: HttpErrorResponse)=>{
      this.processing = false;
      console.log(error.error)
    })
    }
    else{
      this.toastrService.warning(`please fill the field mark (*)`, `Required Fields`);
    }
   }
}
