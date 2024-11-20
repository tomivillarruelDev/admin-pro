import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Menu } from '../interfaces/menu.interface';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'pages-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

    public user?: User;
    constructor(
        public sidebarService: SidebarService,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.user = this.userService.user;
    }
}
