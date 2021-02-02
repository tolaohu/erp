import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as constant from '../constant/api-constant';
import { environment } from '../../../../environments/environment';

@Injectable()
export class NonConstructionReportService {

  formdata = new FormData();
  dateFormat(date: string){
    return new Date(date).toLocaleDateString()
  }

    app2(formVal: any){
      this.formdata.append('ProjectId', formVal.ProjectId);
      this.formdata.append('Title', formVal.Title);
      this.formdata.append('CityId', formVal.CityId);
      this.formdata.append('StateId', formVal.StateId);
      this.formdata.append('CountryId', formVal.CountryId);
      this.formdata.append('AreaModuleNumber', formVal.AreaModuleNumber);
      this.formdata.append('TagNumber', formVal.TagNumber);
      this.formdata.append('DocumentNumber', formVal.DocumentNumber);
      this.formdata.append('Description', formVal.Description);
      this.formdata.append('DrawingReferenceNumber', formVal.DrawingReferenceNumber);
     this.formdata.append('ResponseDate', this.dateFormat(formVal.ResponseDate));
    this.formdata.append('Item', formVal.Item);
    this.formdata.append('SystemsSubSystems', formVal.SystemsSubSystems);
    this.formdata.append('SupplierId', formVal.SupplierId);
    this.formdata.append('ReqEngApproval', formVal.ReqEngApproval);
    this.formdata.append('DocumentReqViolated', formVal.DocumentReqViolated);
    this.formdata.append('NCRImages', formVal.NCRImages);
   this.formdata.append('DrawingFile', formVal.DrawingFile);
   this.formdata.append('DescriptionDocuments', formVal.DescriptionDocuments);


    }
  constructor(private http: HttpClient) {}

  getProject(): Observable<any> {
    return this.http.get(`${environment.apiUrl}${constant.DailyReport.project}`);
  }

  getNationality(): Observable<any>{
    return this.http.get(`${environment.apiUrl}${constant.generalResource.nationality}`)
  }

  getState(): Observable<any>{
    return this.http.get(`${environment.apiUrl}${constant.generalResource.state}`)
  }

  getCity(): Observable<any>{
    return this.http.get(`${environment.apiUrl}${constant.generalResource.city}`)
  }

  getStaff(): Observable<any>{
    return this.http.get(`${environment.apiUrl}${constant.generalResource.staff}`)
  }

  getSupplierr(): Observable<any>{
    return this.http.get(`${environment.apiUrl}${constant.generalResource.supplier}`)
  }

  submit(formVl: any):Observable<any>{
    this.app2(formVl);
    console.log(formVl, '')
    this.formdata.forEach(val=>{
      console.log('val', val);
    })
    // return
    return this.http.post(`${environment.apiUrl}${constant.NonConformanceReport.save}`, this.formdata)
}
  

}
