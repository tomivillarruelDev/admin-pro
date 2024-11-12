import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    public formSubmitted = false;
    public registerForm!: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.registerForm = this.fb.group(
            {
                name: ['', [Validators.required, Validators.minLength(3)]],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                password2: ['', [Validators.required, Validators.minLength(6)]],
                termsAndConditions: [true, Validators.requiredTrue],
            },
            {
                validators: this.passwordsMatch('password', 'password2'),
            }
        );
    }

    createUser() {
        this.formSubmitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.userService.createUser(this.registerForm.value).subscribe(
            (resp) => {
                this.router.navigateByUrl('/');
            },
            (err) => {
                Swal.fire('Error', err.error.msg, 'error');
            }
        );
    }

    fieldIsInvalid(field: string): boolean {
        if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
            return true;
        } else {
            return false;
        }
    }

    invalidPasswords() {
        const password = this.registerForm.get('password')?.value;
        const password2 = this.registerForm.get('password2')?.value;

        if (password !== password2 && this.formSubmitted) {
            return true;
        } else {
            return false;
        }
    }

    passwordsMatch(passwordName: string, passwordName2: string) {
        return (formGroup: FormGroup) => {
            const passwordControl = formGroup.get(passwordName);
            const passwordControl2 = formGroup.get(passwordName2);

            if (passwordControl?.value === passwordControl2?.value) {
                passwordControl2?.setErrors(null);
            } else {
                passwordControl2?.setErrors({ distinct: true });
            }
        };
    }
}
