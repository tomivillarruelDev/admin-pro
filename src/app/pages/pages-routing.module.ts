import { Router, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { authGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './support/users/users.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: DashboardComponent, data: {title: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {title: 'ProgressBar' } },
            { path: 'graph1', component: Graph1Component, data: {title: 'Reporte de Gráficos' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Ajustes de cuenta'} },
            { path: 'promises', component: PromisesComponent, data: {title: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: {title: 'RxJS'} },
            { path: 'profile', component: ProfileComponent, data: {title: 'Mi perfil' } },

            //Support
            { path: 'users', component: UsersComponent, data: {title: 'Usuarios del sistema'} },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
