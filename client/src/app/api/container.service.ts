import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service/api.service';
import { Observable } from 'rxjs';
import { Container } from '../shared/models/container';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  constructor(private apiService: ApiService) { }

  getAll(): Observable<Container[]> {
    return this.apiService.get('containers');
  }

  // get(id: any): Observable<Container> {
  //   return this.apiService.get(`containers/${id}`);
  // }

  create(data: any): Observable<any> {
    return this.apiService.post('containers', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.apiService.put(`containers/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.apiService.delete(`containers/${id}`);
  }

  // deleteAll(): Observable<any> {
  //   return this.apiService.delete('containers');
  // }
}
