import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './support/users/users.component';

import { HospitalsComponent } from './support/hospitals/hospitals.component';

import { DoctorsComponent } from './support/doctors/doctors.component';
import { DoctorComponent } from './support/doctors/doctor/doctor.component';

@NgModule({
    declarations: [
        ProgressComponent,
        Graph1Component,
        PagesComponent,
        DashboardComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        HospitalsComponent,
        DoctorsComponent,
        DoctorComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        FormsModule,
        ComponentsModule,
        ReactiveFormsModule,
        PipesModule
    ],
    exports: [
        ProgressComponent,
        Graph1Component,
        PagesComponent,
        DashboardComponent,
        AccountSettingsComponent,
    ],
})
export class PagesModule {}
