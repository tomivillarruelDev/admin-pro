import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchesService } from '../../services/searches.service';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
    public users: User[] = [];
    public hospitals: Hospital[] = [];
    public doctors: Doctor[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private searchesService: SearchesService
    ) {}

    ngOnInit(): void {
        this.getTerm();
    }

    getTerm() {
        return this.activatedRoute.params.subscribe(({ term }) => {
            console.log(term);
            this.searchesService.searchGlobal(term).subscribe((resp) => {
                console.log(resp);
                this.setResults(resp);
            });
        });
    }

    //asiganr a cada tipo de busqueda su respectivo arreglo, funcion :

    setResults(resp: any) {
        this.users = resp.users;
        this.hospitals = resp.hospitals;
        this.doctors = resp.doctors;
    }
}
