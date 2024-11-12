import {
    Component,
    OnInit,
    AfterViewInit,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
    selector: 'auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
    public formSubmitted = false;

    public loginForm!: FormGroup;

    @ViewChild('googleBtn') googleBtn!: ElementRef;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService
    ) {}

    ngAfterViewInit(): void {
        this.googleInit();
    }

    ngOnInit(): void {
        this.createForm();
    }

    async googleInit() {
        await this.userService.googleInit();

        google.accounts.id.renderButton(
            this.googleBtn.nativeElement,
            { theme: 'outline', size: 'large' } // customization attributes
        );
    }

    createForm() {
        this.loginForm = this.fb.group({
            email: [
                localStorage.getItem('email') || '',
                [Validators.required, Validators.email],
            ],
            password: ['', [Validators.required]],
            remember: [false],
        });
    }

    fieldIsInvalid(field: string): boolean {
        if (this.loginForm.get(field)?.invalid && this.formSubmitted) {
            return true;
        } else {
            return false;
        }
    }

    login() {
        this.formSubmitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.userService.login(this.loginForm.value).subscribe(
            (resp) => {
                if (this.loginForm.get('remember')?.value) {
                    localStorage.setItem(
                        'email',
                        this.loginForm.get('email')?.value
                    );
                } else {
                    localStorage.removeItem('email');
                }

                this.router.navigateByUrl('/');
            },
            (err) => {
                Swal.fire('Error', err.error.msg, 'error');
            }
        );

        //
    }
}
