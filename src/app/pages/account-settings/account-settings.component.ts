import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'pages-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements OnInit{

    public $links!: NodeListOf<HTMLElement>;

    constructor(private settingsService: SettingsService) {}

    ngOnInit(): void {
        this.settingsService.checkCurrentTheme();
    }

    changeTheme(theme: string) {

        this.settingsService.changeTheme(theme);
    }
}
