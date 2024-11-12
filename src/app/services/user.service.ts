import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environments } from '../../environments/environment';

import { RegisterForm } from '../shared/interfaces/register-form.interface';
import { LoginForm } from '../shared/interfaces/login-form.interface';
import { User } from '../models/user.model';
import { ProfileForm } from '../shared/interfaces/profile-form.interface';

declare const google: any;

const base_url = environments.base_url;

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public user!: User;
    constructor(private http: HttpClient, private router: Router) {
        this.googleInit();
    }

    get token(): string {
        return localStorage.getItem('token') || '';
    }

    get uid(): string {
        return this.user.uid!;
    }

    createUser(formData: RegisterForm) {
        return this.http.post(`${base_url}/users`, formData).pipe(
            tap((resp: any) => {
                localStorage.setItem('token', resp.token);
            })
        );
    }

    updateUser(formData: ProfileForm) {
        const newUser = {
            ...this.user,
            ...formData,
        };

        return this.http.put(`${base_url}/users/${this.uid}`, newUser, {
            headers: {
                'x-token': this.token,
            },
        });
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
        return this.http
            .get(`${base_url}/login/renew`, {
                headers: {
                    'x-token': this.token,
                },
            })
            .pipe(
                map((resp: any) => {
                    localStorage.setItem('token', this.token);
                    const {
                        name,
                        email,
                        img = '',
                        google,
                        role,
                        uid,
                    } = resp.user;

                    this.user = new User(
                        name,
                        email,
                        '',
                        img,
                        google,
                        role,
                        uid
                    );

                    return true;
                }),
                catchError((error) => of(false))
            );
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
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
