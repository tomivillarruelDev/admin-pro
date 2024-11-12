import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'pages-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    constructor(private userService: UserService) {}

    logout() {
        this.userService.logout();
    }
}
