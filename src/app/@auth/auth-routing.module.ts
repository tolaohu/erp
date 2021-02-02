/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NgxAuthComponent,
  NgxLoginComponent,
  NgxRegisterComponent,
  NgxLogoutComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
  CustomLoginComponent,
} from './components';
import { ConfirmEmailComponent } from './components/custom/confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './components/custom/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/custom/forgot-password/forgot-password.component';

const routes: Routes = [{
  path: '',
  component: NgxAuthComponent,
  children: [
    {
      path: '',
      component: NgxLoginComponent,
    },
    {
      path: 'login',
      component: CustomLoginComponent,
    },
    // {
    //   path: 'login',
    //   component: NgxLoginComponent,
    // },
    {
      path: 'register',
      component: NgxRegisterComponent,
    },
    {
      path: 'logout',
      component: NgxLogoutComponent,
    },
    {
      path: 'request-password',
      component: NgxRequestPasswordComponent,
    },
    {
      path: 'reset-password',
      component: NgxResetPasswordComponent,
    },
    {
      path: 'confirm-email',
      component: ConfirmEmailComponent,
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
    },
    {
      path: 'resetPassword',
      component: ResetPasswordComponent,
    },
    // {
    //   path: 'retrieve-password',
    //   component: ResetPasswordComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
