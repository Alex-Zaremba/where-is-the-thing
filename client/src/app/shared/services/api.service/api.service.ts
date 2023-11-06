import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiParams } from './types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  api = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  get(url: string, params?: ApiParams): Observable<any> {
    return this.httpClient.get(this.getApiUrl(url), { params });
  }

  post(url: string, body = {}, params?: ApiParams): Observable<any> {
    return this.httpClient.post(this.getApiUrl(url), body, { params });
  }

  put(url: string, body = {}, params?: ApiParams): Observable<any> {
    return this.httpClient.put(this.getApiUrl(url), body, { params });
  }

  delete(url: string, params?: ApiParams): Observable<any> {
    return this.httpClient.delete(this.getApiUrl(url), { params });
  }

  patch(url: string, body = {}, params?: ApiParams): Observable<any> {
    return this.httpClient.patch(this.getApiUrl(url), body, { params });
  }

  private getApiUrl(url: string) {
    return this.api + url.replace(/\/+/g, '/');
  }
}

