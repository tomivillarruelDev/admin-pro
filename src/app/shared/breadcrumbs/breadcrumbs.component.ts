import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
    selector: 'pages-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnDestroy {
    public title!: string;

    public titleSubs$!: Subscription;

    constructor(private router: Router) {
        this.titleSubs$ = this.getRouteParams().subscribe(({ title }) => {
            this.title = title;
            document.title = `AdminPro - ${title}`;
        });
    }
    ngOnDestroy(): void {
        this.titleSubs$.unsubscribe();
    }

    getRouteParams() {
        return this.router.events.pipe(
            filter((event) => event instanceof ActivationEnd),
            filter(
                (event: ActivationEnd) => event.snapshot.firstChild === null
            ),
            map((event: ActivationEnd) => event.snapshot.data)
        );
    }
}
