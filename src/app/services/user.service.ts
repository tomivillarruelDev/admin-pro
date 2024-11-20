import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environments } from '../../environments/environment';

import { User } from '../models/user.model';

import { RegisterForm } from '../shared/interfaces/register-form.interface';
import { LoginForm } from '../shared/interfaces/login-form.interface';
import { ProfileForm } from '../shared/interfaces/profile-form.interface';
import { GetUsersResponse } from '../shared/interfaces/get-users.interface';
import { Menu } from '../shared/interfaces/menu.interface';

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

    get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
        return this.user.role!;
    }

    get headers() {
        return {
            headers: {
                'x-token': this.token,
            },
        };
    }

    saveLocalStorage(token: string, menu: Menu[]) {
        localStorage.setItem('menu', JSON.stringify(menu));
        localStorage.setItem('token', token);
    }

    createUser(formData: RegisterForm) {
        return this.http.post(`${base_url}/users`, formData).pipe(
            tap((resp: any) => {
                this.saveLocalStorage(resp.token, resp.menu);
            })
        );
    }

    updateUser(formData: ProfileForm) {
        const updateUser = {
            ...this.user,
            ...formData,
        };

        return this.http.put(
            `${base_url}/users/${this.uid}`,
            updateUser,
            this.headers
        );
    }

    login(formData: LoginForm) {
        return this.http.post(`${base_url}/login`, formData).pipe(
            tap((resp: any) => {
                this.saveLocalStorage(resp.token, resp.menu);
            })
        );
    }

    loginGoogle(token: string) {
        return this.http.post(`${base_url}/login/google`, { token }).pipe(
            tap((resp: any) => {
                this.saveLocalStorage(resp.token, resp.menu);
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

                    this.saveLocalStorage(resp.token, resp.menu);

                    return true;
                }),
                catchError((error) => of(false))
            );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('menu');
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

    getUsers(from: number = 0): Observable<GetUsersResponse> {
        return this.http
            .get<GetUsersResponse>(
                `${base_url}/users?from=${from}`,
                this.headers
            )
            .pipe(
                map((resp) => {
                    const users: User[] = resp.users.map(
                        (user) =>
                            new User(
                                user.name,
                                user.email,
                                '',
                                user.img,
                                user.google,
                                user.role,
                                user.uid
                            )
                    );
                    return {
                        total: resp.total,
                        users,
                    };
                })
            );
    }

    deleteUser(user: User) {
        const url = `${base_url}/users/${user.uid}`;
        return this.http.delete(url, this.headers);
    }

    saveUser(user: User) {
        return this.http.put(
            `${base_url}/users/${user.uid}`,
            user,
            this.headers
        );
    }
}
