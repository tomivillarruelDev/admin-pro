import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { environments } from '../../environments/environment';

import { User } from '../models/user.model';

const base_url = environments.base_url;

@Injectable({
    providedIn: 'root',
})
export class SearchesService {
    constructor(private http: HttpClient) {}

    get token(): string {
        return localStorage.getItem('token') || '';
    }

    get headers() {
        return {
            headers: {
                'x-token': this.token,
            },
        };
    }

    private transformsUsers(results: User[]): User[] {
        return results.map(
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
    }

    search(type: 'users' | 'hospitals' | 'doctors', term: string = '') {
        const url = `${base_url}/all/collection/${type}/${term}`;

        return this.http.get(url, this.headers).pipe(
            map((resp: any) => {
                switch (type) {
                    case 'users':
                        return this.transformsUsers(resp.results);
                        break;

                    default:
                        return [];
                }
            })
        );
    }
}
