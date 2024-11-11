import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-promises',
    templateUrl: './promises.component.html',
    styleUrl: './promises.component.css',
})
export class PromisesComponent implements OnInit {
    ngOnInit(): void {
        const promise = new Promise(() => {
            console.log('Promesa');
        });
    }
}
