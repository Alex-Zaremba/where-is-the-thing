import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) { }

  getPublicContent(): Observable<any> {
    return this.apiService.get('all');
  }

  getAdminBoard(): Observable<any> {
    return this.apiService.get('admin');
  }
}
