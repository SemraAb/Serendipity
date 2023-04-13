import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthResponseData } from "../models/AuthResponse";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "../models/user";


@Injectable({ providedIn: 'root' })

export class AuthService {
    urlSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsWXS80-h_nv7WZJHy-2bTB05q7VoYjCo';
    urlLogin = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsWXS80-h_nv7WZJHy-2bTB05q7VoYjCo`
    // api linki

    userSubject = new Subject<User>();

    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>( // postla url e mail pasvord secure token gonderilir , ordan gelen cavab da response data ya dusur
            this.urlSignUp,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            tap(
                response => {
                   this.handleAuthentication(response.email,response.localId,response.idToken,+response.expiresIn)
                }
            )
        )
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            this.urlLogin,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            tap(
                response => {
                   this.handleAuthentication(response.email,response.localId,response.idToken,+response.expiresIn)
                }
            )
        )
    }

    private handleAuthentication(
        email:string,
        userId:string,
        token:string,
        expiresIn:number,
    ){
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000)) // millisecondla
                    const user = new User(email, userId, token, expirationDate);
                    this.userSubject.next(user)
    }
}