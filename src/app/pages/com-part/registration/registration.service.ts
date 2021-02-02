import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as constant from '../constant/api-constant';
import { environment } from '../../../../environments/environment';
import { NbGlobalPosition } from '@nebular/theme';

@Injectable()
export class RegistrationService {
    positionOfToast:NbGlobalPosition;


  constructor(private http: HttpClient) {}


  getCompanies(): Observable<any> {
    return this.http.get(`${environment.apiUrl}${constant.generalResource.companies}`);
  }
  
  getRoles(): Observable<any> {
    return this.http.get(`${environment.apiUrl}${constant.generalResource.roles}`);
  }
  submit(body: any):Observable<any>{
      return this.http.post(`${environment.apiUrl}${constant.Register_User.save}`, body)
  }

  

}
