import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service/api.service';
import { Observable } from 'rxjs';
import { Thing } from '../shared/models/thing';

@Injectable({
  providedIn: 'root'
})
export class ThingService {
  constructor(private apiService: ApiService) { }

  getAll(): Observable<Thing[]> {
    return this.apiService.get('things');
  }

  // get(id: any): Observable<Thing> {
  //   return this.apiService.get(`things/${id}`);
  // }

  create(data: any): Observable<any> {
    return this.apiService.post('things', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.apiService.put(`things/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.apiService.delete(`things/${id}`);
  }

  // deleteAll(): Observable<any> {
  //   return this.apiService.delete('things');
  // }
}