import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
    selector: 'components-doughnut-chart',
    templateUrl: './doughnut-chart.component.html',
    styleUrl: './doughnut-chart.component.css',
})
export class DoughnutChartComponent implements OnInit{
    @Input('value') title: string = 'Doughnut Chart';

    public colors: string[] = ['#6857E6', '#009FEE', '#F02059'];

    @Input('labels') doughnutChartLabels: string[] = ['Label 1', 'Label 2', 'Label 3'];

    @Input('data') doughnutChartData: number[] = [100, 30, 50];

    public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
        [
            {
                data: this.doughnutChartData,
                label: 'Series A',
                backgroundColor: this.colors,
            },
        ];

    public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '50%',
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw;
                    },
                },
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
    };

    ngOnInit(): void {
        this.doughnutChartDatasets = [
            {
                data: this.doughnutChartData,
                label: 'Series A',
                backgroundColor: this.colors,
            },
        ];
    }
}
