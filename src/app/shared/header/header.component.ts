import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'pages-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{
    public user?: User;

    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.user = this.userService.user;
    }

    logout() {
        this.userService.logout();
    }

    search(term: string) {
        if (!term) {
            return;
        }
        
        this.router.navigate(['/dashboard/search', term]);
    }
}
