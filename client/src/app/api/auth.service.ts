import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { StorageService, USER_KEY } from '../shared/services/storage.service';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.authApiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      this.loggedIn.next(true);
    }
  }

  private loggedIn: BehaviorSubject<boolean | null> = new BehaviorSubject(null);

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', { username, password, }, httpOptions)
      .pipe(map((data: any) => {
        this.storageService.saveUser(data);
        this.loggedIn.next(true);
        return data;
      }));
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', { username, email, password, }, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions).pipe(map((response: any) => {
      this.loggedIn.next(false);
      return response;
    }));
  }

  public isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
