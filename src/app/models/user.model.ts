import { environments } from '../../environments/environment';

const base_url = environments.base_url;

export class User {
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string
    ) {}

    get imageUrl(): string {
        if (!this.img) {
            return `${base_url}/upload/users/no-image`;
        } else if (this.img?.includes('https')) {
            return this.img;
        } else if (this.img) {
            return `${base_url}/upload/users/${this.img}`;
        } else {
            return `${base_url}/upload/users/no-image`;
        }
    }
}
