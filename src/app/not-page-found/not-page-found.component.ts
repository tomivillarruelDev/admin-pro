import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'components-not-page-found',
    templateUrl: './not-page-found.component.html',
    styleUrls: ['./not-page-found.component.css'],
})
export class NotPageFoundComponent {
    year = new Date().getFullYear();
}
