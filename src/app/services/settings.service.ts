import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    private $linkTheme = document.querySelector('#theme');

    constructor() {
        const themeUrl =localStorage.getItem('themeUrl') || 'css/colors/default-dark.css';

        this.$linkTheme?.setAttribute('href', themeUrl);
    }

    changeTheme(theme: string) {
        const themeUrl = `css/colors/${ theme }.css`;

        this.$linkTheme?.setAttribute('href', themeUrl);
        localStorage.setItem('themeUrl', themeUrl);

        this.checkCurrentTheme();
    }

    checkCurrentTheme() {

        const $links: NodeListOf<HTMLElement> = document.querySelectorAll('.selector');

        $links.forEach( $elem => {
            $elem.classList.remove('working');
            const themeValue = $elem.getAttribute('data-theme');
            const themeUrl = `css/colors/${ themeValue }.css`;

            const currentTheme = this.$linkTheme?.getAttribute('href');

            if (currentTheme === themeUrl) {
                $elem.classList.add('working');
            }

        })
    }
}
