import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';

import { User } from '../../models/user.model';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
    public profileForm!: FormGroup;
    public submittedForm: boolean = false;
    public imgTemp: any =  null;

    public imageToUpload: File | null = null;

    public user!: User;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private fileUploadService: FileUploadService
    ) {}

    ngOnInit(): void {
        this.user = this.userService.user;
        this.createForm();
    }

    createForm() {
        this.profileForm = this.fb.group({
            name: [
                this.user.name || '',
                [Validators.required, Validators.minLength(3)],
            ],
            email: [
                this.user.email || '',
                [Validators.required, Validators.email],
            ],
        });
    }

    updateUser() {
        this.submittedForm = true;

        const { name, email } = this.profileForm.value;
        if (
            !this.profileForm.valid ||
            (name === this.user.name && email === this.user.email)
        ) {
            return;
        }

        this.userService.updateUser(this.profileForm.value).subscribe(
            () => {
                const { name, email } = this.profileForm.value;
                this.user.name = name;
                this.user.email = email;

                Swal.fire(
                    'Guardado',
                    'Cambios guardados correctamente',
                    'success'
                );
            },
            (err) => {
                Swal.fire('Error', err.error.msg, 'error');
            }
        );
    }

    changeImage($event: any): any {
        const file: File = $event.target.files[0];

        if (!file) {
            return this.imgTemp = null;
        }

        const reader = new FileReader();

        this.imageToUpload = file;
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            this.imgTemp = reader.result as string;

        }
    }

    async uploadImage() {
        await this.fileUploadService
            .updateImage(this.imageToUpload!, 'users', this.user.uid!)
            .then((img: string | boolean) => {
                if (img === false) {
                    Swal.fire('Error', 'No se pudo subir la imagen', 'error');
                    return;
                } else {
                    this.user.img = img as string;
                    Swal.fire(
                        'Guardado',
                        'Imagen de perfil actualizada',
                        'success'
                    );
                }
            }).catch((err) => {
                console.log(err);
                Swal.fire('Error', 'No se pudo subir la imagen', 'error');
            });
    }
}
