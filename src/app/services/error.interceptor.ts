import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

export class ErrorInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((response: HttpErrorResponse)=>{
                let message = 'hata olustu';

                if(!navigator.onLine){
                    message = 'Internet baglantiniz yoxdur.'
                    return throwError(message);
                }

                if(response.error.error){
                    if(response.status===401){
                        message = 'Yetkiniz yok';
                        console.log(message);
                        
                        return throwError(message)
                    }
                }
                if (response.error.error) {
                    switch (response.error.error.message) {
                        case 'EMAIL_EXISTS':
                            message = 'This email address is already in use!';
                            break;
                        case 'EMAIL_NOT_FOUND':
                            message = 'This email address could not be found!';
                            break;
                        case 'INVALID_PASSWORD':
                            message = 'This password is not correct!';
                            break;
                    }
                }
                return throwError(message)
            })
        )
    }
}