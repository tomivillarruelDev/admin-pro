import { Router, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { authGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canLoad: [authGuard],
        loadChildren: () => import('./child-routing.module').then(m => m.ChildRoutesModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
