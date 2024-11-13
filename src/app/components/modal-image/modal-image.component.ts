import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
    selector: 'components-modal-image',
    templateUrl: './modal-image.component.html',
})
export class ModalImageComponent {
    public imageToUpload: File | null = null;
    public imgTemp: any = null;

    constructor(
        public modalImageService: ModalImageService,
        private fileUploadService: FileUploadService
    ) {}

    closeModal(): void {
        this.imgTemp = null;
        this.modalImageService.closeModal();
    }

    changeImage($event: any): void {
        const file: File = $event.target.files[0];

        if (!file) {
            this.imgTemp = null;
            return;
        }

        const reader = new FileReader();

        this.imageToUpload = file;
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            this.imgTemp = reader.result as string;
        };
    }

    async uploadImage(): Promise<void> {
        const id = this.modalImageService.id;
        const type = this.modalImageService.type;

        await this.fileUploadService
            .updateImage(this.imageToUpload!, type, id)
            .then((img: string | boolean) => {
                if (img === false) {
                    Swal.fire('Error', 'No se pudo subir la imagen', 'error');
                    return;
                } else {
                    Swal.fire(
                        'Guardado',
                        'Imagen de perfil actualizada',
                        'success'
                    );

                    this.modalImageService.newImage.emit(img as string);

                    this.closeModal();
                }
            })
            .catch((err) => {
                console.log(err);
                Swal.fire('Error', 'No se pudo subir la imagen', 'error');
            });
    }
}
