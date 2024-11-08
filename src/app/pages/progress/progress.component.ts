import { Component } from '@angular/core';

@Component({
    selector: 'pages-progress',
    templateUrl: './progress.component.html',
    styleUrl: './progress.component.css',
})
export class ProgressComponent {

    progress1: number = 20;
    progress2: number = 50;

    get getProgress1() {
        return `${this.progress1}%`;
    }

    get getProgress2() {
        return `${this.progress2}%`;
    }

}
