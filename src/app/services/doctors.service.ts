import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { GetDoctorsResponse } from '../shared/interfaces/get-doctors.interface';

import { Doctor } from '../models/doctor.model';

const base_url = environments.base_url;

@Injectable({
    providedIn: 'root',
})
export class DoctorsService {
    get token() {
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

    getDoctors(from: number = 0): Observable<GetDoctorsResponse> {
        return this.http.get<GetDoctorsResponse>(
            `${base_url}/doctors?from=${from}`,
            this.headers
        );
    }

    getDoctorById(id: string): Observable<Doctor> {
        return this.http
            .get<GetDoctorsResponse>(`${base_url}/doctors/${id}`, this.headers)
            .pipe(map((resp: any) => resp.doctor));
    }

    createDoctor(formData: Doctor) {
        return this.http.post(`${base_url}/doctors`, formData, this.headers);
    }

    updateDoctor(formData: Doctor) {
        const { _id } = formData;

        return this.http.put(
            `${base_url}/doctors/${_id}`,
            formData,
            this.headers
        );
    }

    deleteDoctor(formData: Doctor) {
        const { _id } = formData;

        return this.http.delete(`${base_url}/doctors/${_id}`, this.headers);
    }
}
