import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private _Router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //Get the token from the authServices
    const authToken = this._authService.getToken();
    //clone the request and add the authorization header
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._Router.navigateByUrl('/Login');
        } else if (error.status === 403) {
          this._Router.navigateByUrl('/Page403');

        }

        return throwError(() => error);
      })
    );
  }
}
