import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'pages-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{
    public user?: User;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.user = this.userService.user;
    }


    logout() {
        this.userService.logout();
    }
}
