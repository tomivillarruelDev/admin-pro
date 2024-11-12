import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environments } from '../../environments/environment';

import { RegisterForm } from '../shared/interfaces/register-form.interface';
import { LoginForm } from '../shared/interfaces/login-form.interface';

declare const google: any;

const base_url = environments.base_url;

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private ngZone: NgZone
    ) {
        this.googleInit();
    }

    createUser(formData: RegisterForm) {
        return this.http.post(`${base_url}/users`, formData).pipe(
            tap((resp: any) => {
                localStorage.setItem('token', resp.token);
            })
        );
    }

    login(formData: LoginForm) {
        return this.http.post(`${base_url}/login`, formData).pipe(
            tap((resp: any) => {
                localStorage.setItem('token', resp.token);
            })
        );
    }

    loginGoogle(token: string) {
        return this.http.post(`${base_url}/login/google`, { token }).pipe(
            tap((resp: any) => {
                localStorage.setItem('token', resp.token);
            })
        );
    }

    validateToken(): Observable<boolean> {
        const token = localStorage.getItem('token') || '';

        return this.http
            .get(`${base_url}/login/renew`, {
                headers: {
                    'x-token': token,
                },
            })
            .pipe(
                tap((resp: any) => {
                    localStorage.setItem('token', token);
                }),
                map((resp) => true),
                catchError((error) => of(false))
            );
    }

    logout() {
        localStorage.removeItem('token');
        google.accounts.id.revoke('tomasvillarruel18@gmail.com', () => {
            this.ngZone.run(() => {
                this.router.navigateByUrl('/login');
            });
        });
    }

    googleInit() {
        return new Promise<void>((resolve) => {
            google.accounts.id.initialize({
                client_id:
                    '954516994459-hohu4b12fc65ve5gj47kmcq8cams27cg.apps.googleusercontent.com',
                callback: (response: any) =>
                    this.handleCredentialResponse(response),
            });

            resolve();
        });
    }

    handleCredentialResponse(response: any) {
        this.loginGoogle(response.credential).subscribe((resp) => {
            this.router.navigateByUrl('/');
        });
    }
}
