/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DailyReportComponent } from './com-part/daily-report/daily-report.component';
import { ConstructionReportComponent } from './com-part/construction-report/construction-report.component';
import { NonConformanceReportComponent } from './com-part/non-conformance-report/non-conformance-report.component';
import { DailyReportAltComponent } from './com-part/daily-report-alt/daily-report-alt.component';
import { GeneralSummaryComponent } from './com-part/daily-report-fn/general-summary/general-summary.component';
import { HseComponent } from './com-part/daily-report-fn/hse/hse.component';
import { ProgressMeasurementComponent } from './com-part/daily-report-fn/progress-measurement/progress-measurement.component';
import { ConstructionActivitiesComponent } from './com-part/daily-report-fn/construction-activities/construction-activities.component';
import { ProgressPicturesComponent } from './com-part/daily-report-fn/progress-pictures/progress-pictures.component';
import { OtherSiteComponent } from './com-part/daily-report-fn/other-site/other-site.component';
import { RegistrationComponent } from './com-part/registration/registration.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'register-user',
      component: RegistrationComponent,
    },
    {
      path: 'Daily-Reporting',
     children:[
       {
         path:'',
         redirectTo:'General-Summary',
         pathMatch:'full'
       }, 
       {
        path:'General-Summary',
        component:GeneralSummaryComponent
      },
       {
         path:'HSE',
         component:HseComponent
       },
       {
         path:'Progress-Measurement',
         component:ProgressMeasurementComponent
       },
       {
         path:'Construction-Activities',
         component:ConstructionActivitiesComponent
       },
       {
         path:'Progress-Picture',
         component:ProgressPicturesComponent
       },
       {
         path:'Other-Sites',
         component:OtherSiteComponent
       },
     ]
    },
    // {
    //   path: 'Daily-Reporting',
    //   component: DailyReportAltComponent 
    // },
    // {
    //   path: 'Daily-Reporting',
    //   component: DailyReportComponent 
    // },
    {
      path: 'construction-Reporting',
      component: ConstructionReportComponent
    },
    {
      path: 'non-conformance-Reporting',
      component: NonConformanceReportComponent
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
