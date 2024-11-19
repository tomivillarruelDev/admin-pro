import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';

import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';
import { DoctorsService } from '../../../services/doctors.service';

import { Doctor } from '../../../models/doctor.model';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
})
export class DoctorsComponent implements OnInit, OnDestroy {
    public doctors: Doctor[] = [];

    public totalDoctors: number = 0;
    public doctorsFrom: number = 0;
    public doctorsTemp: Doctor[] = [];

    public loading: boolean = true;
    private imgSubs?: Subscription;

    constructor(
        private doctorsService: DoctorsService,
        private modalImageService: ModalImageService,
        private searchesService: SearchesService
    ) {}

    ngOnInit(): void {
        this.getDoctors();

        this.imgSubs = this.modalImageService.newImage
            .pipe(delay(100))
            .subscribe(() => {
                this.getDoctors();
            });
    }

    ngOnDestroy(): void {
        this.imgSubs?.unsubscribe();
    }

    getDoctors() {
        this.loading = true;
        this.doctorsService.getDoctors().subscribe((resp) => {
            console.log(resp);
            this.doctors = resp.doctors;
            this.totalDoctors = resp.total;
            this.loading = false;
        });
    }

    deleteDoctor(doctor: Doctor) {
        return Swal.fire({
            title: '¿Estás seguro, quieres borrar este doctor?',
            text: `Estás a punto de eliminar al Doctor ${doctor.name} del sistema`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.doctorsService.deleteDoctor(doctor).subscribe(() => {
                    this.getDoctors();

                    Swal.fire({
                        title: 'Doctor eliminado',
                        text: `El Doctor ${doctor.name} ha sido eliminado correctamente`,
                        icon: 'success',
                    });
                });
            }
        });
    }

    searchDoctor(term: string) {
        if (term.length == 0) {
            return (this.doctors = this.doctorsTemp);
        }

        this.loading = true;

        return this.searchesService
            .search('doctors', term)
            .subscribe((resp) => {
                this.doctors = resp;
                this.loading = false;
            });
    }

    async openSweetCreate() {
        const { value = '' } = await Swal.fire<string>({
            title: 'Crear nuevo doctor',
            text: 'Ingrese el nombre del nuevo doctor',
            input: 'text',
            inputPlaceholder: 'Nombre del doctor',
            showCancelButton: true,
        });

        if (value === '') {
            return;
        }
    }

    openModal(doctor: Doctor): void {
        this.modalImageService.openModal('doctors', doctor._id!, doctor.img);
    }

    changePage(value: number): void {
        this.doctorsFrom += value;

        if (this.doctorsFrom < 0) {
            this.doctorsFrom = 0;
        } else if (this.doctorsFrom > this.totalDoctors) {
            this.doctorsFrom -= value;
        }

        this.getDoctors();
    }
}
