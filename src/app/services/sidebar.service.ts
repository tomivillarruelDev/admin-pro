import { Injectable } from '@angular/core';
import { Menu } from '../shared/interfaces/menu.interface';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    public menu: Menu[] = [];

    constructor(private userService: UserService) {}

    loadMenu() {
        const menu = localStorage.getItem('menu');
        if (menu) {
            try {
                this.menu = JSON.parse(menu);
            } catch (error) {
                this.menu = [];
            }
        } else {
            this.menu = [];
        }
    }
}
