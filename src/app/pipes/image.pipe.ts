import { Pipe, PipeTransform } from '@angular/core';
import { environments } from '../../environments/environment';

const base_url = environments.base_url;

@Pipe({
    name: 'image',
})
export class ImagePipe implements PipeTransform {
    transform(
        img: string | undefined,
        type: 'users' | 'hospitals' | 'doctors'
    ): string {
        if (!img) {
            return `${base_url}/upload/${type}/no-image`;
        } else if (img.includes('https')) {
            return img;
        } else if (img) {
            return `${base_url}/upload/${type}/${img}`;
        } else {
            return `${base_url}/upload/${type}/no-image`;
        }
    }
}
