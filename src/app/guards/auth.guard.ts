import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';

export const authGuard: CanMatchFn = (route, state) => {
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.validateToken().pipe(
        tap((isAuth) => {
            if (!isAuth) {
                router.navigateByUrl('/login');
            }
        })
    );
};
