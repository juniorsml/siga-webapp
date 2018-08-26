import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../../shared/services/http.service';
import { Operation } from '../../../shared/models/api/Operation';

@Injectable()
export class OperationService {

  constructor(private http: HttpService) { }

  public getOperations(): Observable<Array<Operation>> {
    return this
      .http
      .get(`api/operations`)
      .pipe(map(res => <Array<Operation>>res.json()));
  }

  public getOperation(operationId:string): Observable<any> {
    return this
      .http
      .get(`api/operations/${operationId}`)
      .first()
      .pipe(map(res => res.json()));
  }

  public saveOperation(operation: Operation): Observable<any> {
    return this
      .http
      .post('api/operations', operation)
      .first()
      .pipe(map(res => res.json()));
  }

  public updateOperation(operation: Operation): Observable<any> {
    
    return this
      .http
      .put(`api/operations/${operation.id}`, operation)
      .first()
      .pipe(map(res => res.json()));
  }

}
