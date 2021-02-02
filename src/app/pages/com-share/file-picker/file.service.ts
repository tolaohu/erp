import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment}  from '../../../../environments/environment';
import * as constant from '../../com-part/constant/api-constant';

@Injectable()
export class FilePickerService {
  apiBaseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}
    
  formdata = new FormData();


    saveSingle(body): Observable<any>{
      this.formdata.set('file', body);
      return this.save(`${constant.file_Upload.single}`,this.formdata)
    }

    saveMultiple(body:any[]): Observable<any>{
      for(let index = 0; index < body.length; index++){
        this.formdata.append('files', body[index]);
      }
      return this.save(`${constant.file_Upload.multiple}`,this.formdata)
    }

    save(endpointUrl: string, body:any ) : Observable<any>{
    return  this.http.post(`${this.apiBaseUrl}${endpointUrl}`, body)
    }
  
   
  }
