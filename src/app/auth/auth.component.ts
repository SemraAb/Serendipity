import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms"
import { Observable } from "rxjs";
import { AuthResponseData } from "../models/AuthResponse";
import { AuthService } from './auth.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode:boolean = true;
    isLoading: boolean = false;
    error: string;
    repeatPassword: string;

    constructor(private authService: AuthService, private router: Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        // valid deyilse hec ne retrun elemir , validdirse asagidaki mail ve passwordu 

        const email = form.value.email;
        const password = form.value.password;

        this.isLoading= true;
        let authResponse: Observable<AuthResponseData>

        if (this.isLoginMode) {
            authResponse = this.authService.login(email, password)
        } else {
            authResponse = this.authService.signup(email, password);
            // auth.service.ts deki signup methodudur
            const repeatPassword = form.value.passwordRep;
            console.log(repeatPassword);
            if (password !== repeatPassword) {
                alert("Passwords don't match!");
                return;
            }

        }

        authResponse.subscribe(
            response => {
                this.router.navigate(['/main'])
                this.isLoading= false;
            }, 
            err => {
                this.error = err;
                this.isLoading= false;
            }
        )

        form.reset();
    }
}