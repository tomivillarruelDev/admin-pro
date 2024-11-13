import { EventEmitter, Injectable } from '@angular/core';
import { environments } from '../../environments/environment';

const base_url = environments.base_url;

@Injectable({
    providedIn: 'root',
})
export class ModalImageService {
    private _hideModal: boolean = true;

    public type: 'users' | 'doctors' | 'hospitals' = 'users';
    public id!: string;
    public img: string = '';

    public newImage: EventEmitter<string> = new EventEmitter<string>();

    get hideModal(): boolean {
        return this._hideModal;
    }

    constructor() {}

    openModal(type: 'users' | 'doctors' | 'hospitals', id: string, img: string = 'no-image'): void {
        this._hideModal = false;

        this.type = type;
        this.id = id;
        this.img = img;

        if (img.includes('https')) {
            this.img = img;
        } else {
            this.img = `${base_url}/upload/${type}/${img}`;
        }
    }

    closeModal(): void {
        this._hideModal = true;
    }
}
