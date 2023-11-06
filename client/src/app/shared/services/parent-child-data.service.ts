import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ParentChildDataService {
  public parentChildData: any;
  public parentChildData$ = new Subject<any>();

  constructor() { }

  public async clear(): Promise<any> {
    this.parentChildData = null;
    this.parentChildData$.next(null);
  }

  setParentChildData(data: any) {
    this.parentChildData = data;
    this.parentChildData$.next(data);
  }

}
