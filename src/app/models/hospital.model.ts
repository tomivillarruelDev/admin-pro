interface _HospitalUser {
    _id: string;
    name: string;
    email: string;
}

export class Hospital {
    constructor(
        public name: string,
        public _id?: string,
        public img?: string,
        public user?: _HospitalUser
    ) {}
}
