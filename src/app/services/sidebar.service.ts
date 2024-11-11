import { Injectable } from '@angular/core';
import { Menu } from '../shared/interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
    menu: Menu[] = [
        {
            title: 'Dashboard',
            icon: 'ti-world',
            submenu: [
                { title: 'Main', path: '/' },
                { title: 'ProgressBar', path: 'progress' },
                { title: 'Gráficos', path: 'graph1' },
                { title: 'Promesas', path: 'promises' },
                { title: 'RXJS', path: 'rxjs' },
            ],
        },
    ];

  constructor() { }
}
