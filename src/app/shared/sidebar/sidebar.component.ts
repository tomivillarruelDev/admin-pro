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
    menuItems: Menu[];

    public user?: User;
    constructor(
        private sidebarService: SidebarService,
        private userService: UserService
    ) {
        this.menuItems = this.sidebarService.menu;
    }

    ngOnInit(): void {
        this.user = this.userService.user;
    }
}
