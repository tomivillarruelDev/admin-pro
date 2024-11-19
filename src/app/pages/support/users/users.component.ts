import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay, Subscription } from 'rxjs';

import { UserService } from '../../../services/user.service';
import { SearchesService } from '../../../services/searches.service';
import { ModalImageService } from '../../../services/modal-image.service';

import { User } from '../../../models/user.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
    public users: User[] = [];

    public totalUsers: number = 0;
    public usersFrom: number = 0;
    public usersTemp: User[] = [];

    public loading: boolean = true;
    public imgSubs?: Subscription;

    constructor(
        private userService: UserService,
        private searchesService: SearchesService,
        private modalImageService: ModalImageService
    ) {}

    ngOnInit(): void {
        this.getUsers();

        this.imgSubs = this.modalImageService.newImage
            .pipe(delay(100))
            .subscribe(() => {
                this.getUsers();
            });
    }

    ngOnDestroy(): void {
        this.imgSubs?.unsubscribe();
    }

    getUsers(): void {
        this.loading = true;

        this.userService
            .getUsers(this.usersFrom)
            .subscribe(({ total, users }) => {
                this.totalUsers = total;
                this.users = users;
                this.usersTemp = users;
                this.loading = false;
            });
    }

    deleteUser(user: User): any {
        if (user.uid === this.userService.uid) {
            return Swal.fire({
                title: 'No puedes borrar tu propio usuario',
                text: 'Tu usuario está logueado actualmente',
                icon: 'error',
            });
        }

        return Swal.fire({
            title: '¿Estás seguro, quieres borrar este usuario?',
            text: `Estás a punto de eliminar a ${user.name} de los usuarios del sistema`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.userService.deleteUser(user).subscribe(() => {
                    this.getUsers();

                    Swal.fire({
                        title: 'Usuario eliminado',
                        text: `El usuario ${user.name} ha sido eliminado correctamente`,
                        icon: 'success',
                    });
                });
            }
        });
    }

    changeRole(user: User): any {
        return Swal.fire({
            title: '¿Estás seguro, quieres actualizar el rol de este usuario?',
            text: `Estás a punto de actualizar el rol de ${user.name} a ${user.role}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, actualizar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.userService.saveUser(user).subscribe(() => {
                    Swal.fire({
                        title: 'Rol actualizado',
                        text: `Ahora ${user.name} es ${user.role}`,
                        icon: 'success',
                    });
                });
            } else {
                this.getUsers();
            }
        });
    }

    searchUser(term: string): any | Subscription {
        if (term.length == 0) {
            return (this.users = this.usersTemp);
        }

        this.loading = true;

        return this.searchesService.search('users', term).subscribe((users: User[]) => {
            this.users = users;
            this.loading = false;
        });
    }

    changePage(value: number): void {
        this.usersFrom += value;

        if (this.usersFrom < 0) {
            this.usersFrom = 0;
        } else if (this.usersFrom > this.totalUsers) {
            this.usersFrom -= value;
        }

        this.getUsers();
    }

    openModal(user: User): void {
        this.modalImageService.openModal('users', user.uid!, user.img);
    }
}
