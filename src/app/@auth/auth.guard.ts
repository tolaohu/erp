/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './components/extras/auth-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: NbAuthService, private router: Router, private service: AuthService) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot,
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.authService.isAuthenticated()
  //     .pipe(
  //       tap(authenticated => {
  //         if (!authenticated) {
  //           this.router.navigate(['auth/login']);
  //         }
  //       }),
  //     );

  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.autheticated()
      .pipe(
        tap(authenticated => {
          // console.log(authenticated, 'va', route.url)
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );

  }

  // autheticated():Observable<boolean>{
  //   return localStorage.getItem('token') ? of(true) : of(false);
  // }

  autheticated():Observable<boolean>{
    return this.service.isTokenValid() ? of(true) : of(false);
  }
}
