import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BaseChartDirective } from 'ng2-charts';

import { IncreaserComponent } from './increaser/increaser.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

@NgModule({
    declarations: [IncreaserComponent, DoughnutChartComponent],
    exports: [IncreaserComponent, DoughnutChartComponent],
    imports: [
        CommonModule,
        FormsModule,
        BaseChartDirective,
    ],
})
export class ComponentsModule {}
