import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './support/users/users.component';
import { HospitalsComponent } from './support/hospitals/hospitals.component';
import { DoctorsComponent } from './support/doctors/doctors.component';
import { DoctorComponent } from './support/doctors/doctor/doctor.component';
import { SearchComponent } from './search/search.component';
import { adminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
    { path: '', component: DashboardComponent, data: {title: 'Dashboard'} },
    { path: 'progress', component: ProgressComponent, data: {title: 'ProgressBar' } },
    { path: 'graph1', component: Graph1Component, data: {title: 'Reporte de Gráficos' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Ajustes de cuenta'} },
    { path: 'search/:term', component: SearchComponent, data: {title: 'Resultados'} },
    { path: 'profile', component: ProfileComponent, data: {title: 'Mi perfil' } },

    //Support
    { path: 'hospitals', component: HospitalsComponent, data: {title: 'Mantenimiento Hospitales'} },
    { path: 'doctors', component: DoctorsComponent, data: {title: 'Mantenimiento de Doctores'} },
    { path: 'doctor/:id', component: DoctorComponent, data: {title: 'Mantenimiento de Doctor'} },

    //Admin
    { path: 'users', canMatch: [adminGuard], component: UsersComponent, data: {title: 'Usuarios del sistema'} },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }
