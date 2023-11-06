import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service/api.service';
import { Observable } from 'rxjs';
import { ContainerShortModel, Distribution } from '../shared/models/distribution';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {
  constructor(private apiService: ApiService) { }

  getAll(): Observable<Distribution[]> {
    return this.apiService.get('distributions');
  }

  // get(id: any): Observable<Distribution> {
  //   return this.apiService.get(`distributions/${id}`);
  // }

  getCurrentUserDistribution(): Observable<Distribution> {
    return this.apiService.get('distributions/current-user');
  }

  create(arr: ContainerShortModel[]): Observable<Distribution> {
    return this.apiService.post('distributions', { distribution: arr });
  }

  // update(id: any, data: any): Observable<any> {
  //   return this.apiService.put(`distributions/${id}`, data);
  // }

  // delete(id: any): Observable<any> {
  //   return this.apiService.delete(`distributions/${id}`);
  // }
}
