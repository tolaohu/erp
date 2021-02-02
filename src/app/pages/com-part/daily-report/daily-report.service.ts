import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as constant from '../constant/api-constant';
import { environment } from '../../../../environments/environment';
import { NbGlobalPosition } from '@nebular/theme';

@Injectable()
export class DailyReportService {
    positionOfToast:NbGlobalPosition;
    formdata = new FormData();

    app2(formVal: any){
      this.formdata.append('projectId', formVal.projectId);
      this.formdata.append('generalSummary', formVal.generalSummary);
      this.formdata.append('hseReport', JSON.stringify(formVal.hseReport));
      this.formdata.append('constructionActivities', formVal.constructionActivities);
      this.formdata.append('dailyProgress', formVal.dailyProgress);
      this.formdata.append('followingDayPlan', formVal.followingDayPlan);
      this.formdata.append('progressAt', formVal.progressAt);
      this.formdata.append('constructionActual', formVal.constructionActual);
      this.formdata.append('planned', formVal.planned);
      this.formdata.append('dailyReportingProgressMeasurement', JSON.stringify(formVal.dailyReportingProgressMeasurement));
     this.formdata.append('dailyReportingIssues', JSON.stringify(formVal.dailyReportingIssues));
    this.formdata.append('dailyReportingDelays', JSON.stringify(formVal.dailyReportingDelays));
   this.formdata.append('dailyReportingFileAttachments', JSON.stringify(formVal.dailyReportingFileAttachments));


    }

  constructor(private http: HttpClient) {}

  getProject(): Observable<any> {
    return this.http.get(`${environment.apiUrl}${constant.DailyReport.project}`);
  }

  submit(body: any):Observable<any>{
      return this.http.post(`${environment.apiUrl}${constant.DailyReport.save}`, body)
  }

  sum(formVl: any):Observable<any>{
    this.app2(formVl);
    console.log(formVl, '')
    this.formdata.forEach(val=>{
      console.log('val', val.toString());
    })
    // return
    return this.http.post(`${environment.apiUrl}${constant.DailyReport.save}`, this.formdata)
}

  

}
