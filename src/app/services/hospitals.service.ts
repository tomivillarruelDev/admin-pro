import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';
import { map, Observable, tap } from 'rxjs';
import { GetHospitalsResponse } from '../shared/interfaces/get-hospitals.interface';

const base_url = environments.base_url;

@Injectable({
    providedIn: 'root',
})
export class HospitalsService {
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

    constructor(private http: HttpClient) {}

    getHospitals(from: number = 0): Observable<GetHospitalsResponse> {
        return this.http.get<GetHospitalsResponse>(
            `${base_url}/hospitals?from=${from}`,
            this.headers
        );
    }

    createHospital(name: string) {
        return this.http.post(`${base_url}/hospitals`, { name }, this.headers);
    }

    updateHospital(formData: Hospital) {
        const { _id, name } = formData;

        return this.http.put(
            `${base_url}/hospitals/${_id}`,
            { name },
            this.headers
        );
    }

    deleteHospital(formData: Hospital) {
        const { _id } = formData;

        return this.http.delete(`${base_url}/hospitals/${_id}`, this.headers);
    }
}
