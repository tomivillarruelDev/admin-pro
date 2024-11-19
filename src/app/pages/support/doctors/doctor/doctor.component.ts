import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HospitalsService } from '../../../../services/hospitals.service';
import { DoctorsService } from '../../../../services/doctors.service';

import { Hospital } from '../../../../models/hospital.model';
import { Doctor } from '../../../../models/doctor.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
})
export class DoctorComponent implements OnInit {
    public doctorForm!: FormGroup;
    public submittedForm: boolean = false;

    public hospitals!: Hospital[];
    public selectedHospital?: Hospital;
    public selectedDoctor?: Doctor;

    constructor(
        private fB: FormBuilder,
        private hospitalsService: HospitalsService,
        private doctorsService: DoctorsService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(({ id }) => {
            if (id !== 'new') {
                this.getDoctorById(id);
            }
        });
        this.getHospitals();
        this.createForm();

        this.getDataSelectedHospital();
    }

    getHospitals(): void {
        this.hospitalsService
            .getHospitals()
            .subscribe((resp) => (this.hospitals = resp.hospitals));
    }

    createForm(): void {
        this.doctorForm = this.fB.group({
            name: ['', Validators.required],
            hospital: ['', Validators.required],
        });
    }

    getDataSelectedHospital(): void {
        this.doctorForm
            .get('hospital')
            ?.valueChanges.subscribe((hospitalId) => {
                this.selectedHospital = this.hospitals.find(
                    (hospital) => hospital._id === hospitalId
                );
            });
    }

    saveDoctor() {
        this.submittedForm = true;

        if (this.doctorForm.invalid) {
            return;
        }

        if (this.selectedDoctor) {
            const data = {
                ...this.doctorForm.value,
                _id: this.selectedDoctor._id,
            };
            this.doctorsService.updateDoctor(data).subscribe(() => {
                Swal.fire({
                    title: 'Doctor actualizado',
                    text: `Doctor ${this.doctorForm.value.name} actualizado correctamente`,
                    icon: 'success',
                });
            });
        } else {
            this.doctorsService
                .createDoctor(this.doctorForm.value)
                .subscribe((resp: any) => {
                    Swal.fire({
                        title: 'Doctor creado',
                        text: `Doctor ${this.doctorForm.value.name} creado correctamente`,
                        icon: 'success',
                    });

                    this.router.navigateByUrl(
                        `/dashboard/doctor/${resp.doctor._id}`
                    );
                });
        }
    }

    getDoctorById(id: string): void {
        this.doctorsService.getDoctorById(id).subscribe(
            (doctor) => {
                this.selectedDoctor = doctor;
                this.setDoctorData(doctor);
            },
            (err) => {
                console.log(err);
                this.router.navigateByUrl('/dashboard/doctors');
                return;
            }
        );
    }

    setDoctorData(doctor: Doctor): void {
        const { name, hospital } = doctor;

        this.doctorForm.setValue({
            name,
            hospital: hospital?._id,
        });
    }
}
