import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Menu } from '../interfaces/menu.interface';

@Component({
    selector: 'pages-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
    menuItems: Menu[];

    constructor(private sidebarService: SidebarService) {
        this.menuItems = this.sidebarService.menu;
    }
}
