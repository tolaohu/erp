import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export const TOKEN_NAME: string = 'token';
export const EXPIRATION: string = 'expiration';
export const ROLES: string = 'roles';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

  private url: string = environment.apiUrl;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  setRoles(roles:any[]){
    localStorage.setItem(ROLES, JSON.stringify(roles))
  }

  getRoles(): string{
   return localStorage.getItem(ROLES)
  }

  getTokenExpirationDate(){
    return localStorage.getItem(EXPIRATION);
  }

  setTokenExpirationDate(expiration: string){
    return localStorage.setItem(EXPIRATION, expiration);
  }

  isTokenExpired(expiration?: string): boolean {
    if(!expiration) expiration = this.getTokenExpirationDate();
    if(!expiration) return true;

    const date = new Date (expiration);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  isTokenValid(): string{
    if(!this.isTokenExpired(this.getTokenExpirationDate())) return this.getToken();
  }

  login(user): Observable<any> {
    return this.http
      .post(`${this.url}/api/v1/users/login`, JSON.stringify(user), { headers: this.headers })
  }

}