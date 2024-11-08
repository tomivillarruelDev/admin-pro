import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
    declarations: [
        ProgressComponent,
        Graph1Component,
        PagesComponent,
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        FormsModule,
        ComponentsModule,
    ],
    exports: [
        ProgressComponent,
        Graph1Component,
        PagesComponent,
        DashboardComponent,
    ],
})
export class PagesModule {}
