import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StorageService } from '../shared/services/storage.service';
import { EventBusService } from '../shared/event-bus.service';
import { EventData } from '../shared/event.class';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private storageService: StorageService,
    private eventBusService: EventBusService,
    private snackBar: MatSnackBar
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          return this.handle400Error(req, next, error);
        }
        if (error instanceof HttpErrorResponse && error.status === 403) {
          return this.handle403Error(req, next, error);
        }
        if (error instanceof HttpErrorResponse && !req.url.includes('auth/signin') && error.status === 401) {
          return this.handle401Error(req, next);
        }
        if (error instanceof HttpErrorResponse && req.url.includes('auth/signin') && error.status === 401) {
          return this.handle401WrongCredentials(req, next, error);
        }
        if (error instanceof HttpErrorResponse && error.status === 404) {
          return this.handle404Error(req, next, error);
        }

        if (error?.error?.message) { // for all other uncovered cases
          this.openSnackBar(error?.error?.message);
        }

        return throwError(() => error);
      })
    );
  }

  private handle400Error(request: HttpRequest<any>, next: HttpHandler, error: any) {
    this.openSnackBar(error?.error?.message);
    return throwError(() => error);
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler, error: any) {
    this.openSnackBar(error?.error?.message);
    this.storageService.clean();
    this.eventBusService.emit(new EventData('logout', null));
    return throwError(() => error);
  }

  private handle404Error(request: HttpRequest<any>, next: HttpHandler, error: any) {
    this.openSnackBar(error?.error?.message ?? 'Not Found Exception');
    return throwError(() => error);
  }

  private handle401WrongCredentials(request: HttpRequest<any>, next: HttpHandler, error: any) {
    this.openSnackBar(error?.error?.message);
    return throwError(() => error);
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.storageService.isLoggedIn()) {
        this.eventBusService.emit(new EventData('logout', null));
      }
    }

    return next.handle(request);
  }

  openSnackBar(message: string = '') {
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
