/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesMenu } from './pages-menu';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbProgressBarModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbStepperModule, NbToastrModule, NbToggleModule, NbUserModule } from '@nebular/theme';
import { AuthModule } from '../@auth/auth.module';
import { DailyReportComponent } from './com-part/daily-report/daily-report.component';
import { ConstructionReportComponent } from './com-part/construction-report/construction-report.component';
import { NonConformanceReportComponent } from './com-part/non-conformance-report/non-conformance-report.component';
import { FilePickerComponent } from './com-share/file-picker/file-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DailyReportAltComponent } from './com-part/daily-report-alt/daily-report-alt.component';
import { GeneralSummaryComponent } from './com-part/daily-report-fn/general-summary/general-summary.component';
import { HseComponent } from './com-part/daily-report-fn/hse/hse.component';
import { ProgressMeasurementComponent } from './com-part/daily-report-fn/progress-measurement/progress-measurement.component';
import { ConstructionActivitiesComponent } from './com-part/daily-report-fn/construction-activities/construction-activities.component';
import { ProgressPicturesComponent } from './com-part/daily-report-fn/progress-pictures/progress-pictures.component';
import { OtherSiteComponent } from './com-part/daily-report-fn/other-site/other-site.component';
import { RegistrationComponent } from './com-part/registration/registration.component';
import { ChangePasswordComponent } from './com-part/change-password/change-password.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbToggleModule,
    NbProgressBarModule,
    NbMenuModule,
    NbStepperModule,
    MiscellaneousModule,
    AuthModule.forRoot(),
    NbToastrModule.forRoot(),
    NbSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    DailyReportComponent,
    ConstructionReportComponent,
    NonConformanceReportComponent,
    FilePickerComponent,
    DailyReportAltComponent,
    GeneralSummaryComponent,
    HseComponent,
    ProgressMeasurementComponent,
    ConstructionActivitiesComponent,
    ProgressPicturesComponent,
    OtherSiteComponent,
    RegistrationComponent,
    ChangePasswordComponent,
  ],
  providers: [
    PagesMenu,
  ],
})
export class PagesModule {
}
