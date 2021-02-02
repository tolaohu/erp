import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as constant from '../constant/api-constant';
import { environment } from '../../../../environments/environment';
import { NbGlobalPosition } from '@nebular/theme';

@Injectable()
export class ConstructionReportService {

  formdata = new FormData();
  dateFormat(date: string){
    return new Date(date).toLocaleDateString()
  }

    app2(formVal: any){
      this.formdata.append('projectId', formVal.projectId);
      this.formdata.append('CtqTitle', formVal.CtqTitle);
      this.formdata.append('CityId', formVal.CityId);
      this.formdata.append('StateId', formVal.StateId);
      this.formdata.append('CountryId', formVal.CountryId);
      this.formdata.append('CtqNumber', formVal.CtqNumber);
      this.formdata.append('QueryDate', this.dateFormat(formVal.QueryDate));
      this.formdata.append('CtqDescription', formVal.CtqDescription);
      this.formdata.append('AttendeeId', formVal.AttendeeId);
     this.formdata.append('ReplyRequiredBy', this.dateFormat(formVal.ReplyRequiredBy));
    this.formdata.append('Priority', formVal.Priority);
   this.formdata.append('DrawingFile', formVal.DrawingFile);


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

  getCtq(): Observable<any>{
    return this.http.get(`${environment.apiUrl}${constant.generalResource.Ctq}`)
  }

  getAttendeeCtq(): Observable<any>{
    return this.http.get(`${environment.apiUrl}${constant.generalResource.attendeeCtq}`)
  }

  getInitiatorCtq(): Observable<any>{
    return this.http.get(`${environment.apiUrl}${constant.generalResource.InitiatorCtq}`)
  }

  submit(formVl: any):Observable<any>{
    this.app2(formVl);
    console.log(formVl, '')
    this.formdata.forEach(val=>{
      console.log('val', val.toString());
    })
    // return
    return this.http.post(`${environment.apiUrl}${constant.ConstructionReport.save}`, this.formdata)
}

save(formVal: any,val:string, ctq :number):Observable<any>{
  let url ='';
  console.log('va', val)
  if(val=='attention'){
     url = `${environment.apiUrl}${constant.ConstructionReport.AttentionReply}?ctqId=${ctq}`;
  }
  else{
    url = `${environment.apiUrl}${constant.ConstructionReport.InitiatorReply}?ctqId=${ctq}`
  }
  return this.http.post(url, formVal);
}
  

}
