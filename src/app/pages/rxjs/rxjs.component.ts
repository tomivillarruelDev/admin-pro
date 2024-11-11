import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry, interval, take, map, Subscription } from 'rxjs';

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styleUrl: './rxjs.component.css',
})
export class RxjsComponent implements OnInit, OnDestroy {

    public intervalSubs: Subscription;


    ngOnInit(): void {}

    constructor() {

        this.intervalSubs = this.returnInterval().subscribe(
            value => console.log('Subs:', value),
            error => console.error('Error:', error),
            () => console.log('El observador terminó')
        );
    }
    
    ngOnDestroy(): void {
        this.intervalSubs.unsubscribe();
    }

    returnInterval(): Observable<number> {
        return interval(500).pipe(
            map((value) => value + 1)
        );
    }

    returnObservable(): Observable<number> {
        let i = -1;

        return new Observable<number>((observer) => {
            const interval = setInterval(() => {
                i++;
                observer.next(i);

                if (i === 4) {
                    clearInterval(interval);
                    observer.complete();
                }

                if (i === 2) {
                    observer.error('i llegó al valor de 2');
                }
            }, 1000);
        });
    }
}
