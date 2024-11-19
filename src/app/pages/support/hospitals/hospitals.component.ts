import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay, Subscription } from 'rxjs';

import { HospitalsService } from '../../../services/hospitals.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';

import { Hospital } from '../../../models/hospital.model';

@Component({
    selector: 'app-hospitals',
    templateUrl: './hospitals.component.html',
})
export class HospitalsComponent implements OnInit, OnDestroy {
    public hospitals: Hospital[] = [];

    public totalHospitals: number = 0;
    public hospitalsFrom: number = 0;
    public hospitalsTemp: Hospital[] = [];

    public loading: boolean = true;
    private imgSubs?: Subscription;

    constructor(
        private hospitalsService: HospitalsService,
        private modalImageService: ModalImageService,
        private searchesService: SearchesService
    ) {}

    ngOnInit(): void {
        this.getHospitals();

        this.imgSubs = this.modalImageService.newImage
            .pipe(delay(100))
            .subscribe(() => {
                this.getHospitals();
            });
    }

    ngOnDestroy(): void {
        this.imgSubs?.unsubscribe();
    }

    getHospitals(): void {
        this.loading = true;
        this.hospitalsService.getHospitals().subscribe((resp) => {
            this.hospitals = resp.hospitals;
            this.totalHospitals = resp.total;
            this.loading = false;
        });
    }

    updateHospital(hospital: Hospital) {
        return Swal.fire({
            title: '¿Estás seguro, quieres actualizar este hospital?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, actualizar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.hospitalsService.updateHospital(hospital).subscribe(() => {
                    this.getHospitals();

                    Swal.fire({
                        title: 'Hospital actualizado',
                        text: `El hospital ha sido actualizado correctamente`,
                        icon: 'success',
                    });
                });
            }
        });
    }

    deleteHospital(hospital: Hospital) {
        return Swal.fire({
            title: '¿Estás seguro, quieres borrar este hospital?',
            text: `Estás a punto de eliminar a ${hospital.name} del sistema`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.hospitalsService.deleteHospital(hospital).subscribe(() => {
                    this.getHospitals();

                    Swal.fire({
                        title: 'Hospital eliminado',
                        text: `El hospital ${hospital.name} ha sido eliminado correctamente`,
                        icon: 'success',
                    });
                });
            }
        });
    }

    async openSweetCreate() {
        const { value = '' } = await Swal.fire<string>({
            title: 'Crear nuevo hospital',
            text: 'Ingrese el nombre del nuevo hospital',
            input: 'text',
            inputPlaceholder: 'Nombre del hospital',
            showCancelButton: true,
        });

        if (value === '') {
            return;
        }

        this.hospitalsService.createHospital(value!).subscribe(() => {
            this.getHospitals();
            Swal.fire({
                title: 'Hospital creado',
                text: `El hospital ${value} ha sido creado correctamente`,
                icon: 'success',
            });
        });
    }

    openModal(hospital: Hospital): void {
        this.modalImageService.openModal(
            'hospitals',
            hospital._id!,
            hospital.img
        );
    }

    changePage(value: number): void {
        this.hospitalsFrom += value;

        if (this.hospitalsFrom < 0) {
            this.hospitalsFrom = 0;
        } else if (this.hospitalsFrom > this.totalHospitals) {
            this.hospitalsFrom -= value;
        }

        this.getHospitals();
    }

    searchHospital(term: string): any | Subscription {
        if (term.length == 0) {
            return (this.hospitals = this.hospitalsTemp);
        }

        this.loading = true;

        return this.searchesService
            .search('hospitals', term)
            .subscribe((hospitals: Hospital[]) => {
                this.hospitals = hospitals;
                this.loading = false;
            });
    }
}
