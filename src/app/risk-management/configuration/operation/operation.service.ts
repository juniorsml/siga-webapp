import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../../shared/services/http.service';
import { Operation } from '../../../shared/models/api/Operation';

@Injectable()
export class OperationService {

  constructor(private http: HttpService) { }

  public getConfigs(): Observable<Array<Operation>> {
    return this
      .http
      .get(`api/trips/configs`)
      .pipe(map(res => <Array<Operation>>res.json()));
  }

  public getOperation(operationId:string): Observable<any> {
    return this
      .http
      .get(`api/trips/configs/${operationId}`)
      .first()
      .pipe(map(res => res.json()));
  }

  public saveOperation(operation: Operation): Observable<any> {

    return this
      .http
      .post('api/trips/configs', operation)
      .first()
      .pipe(map(res => res.json()));
  }

  public updateOperation(operation: Operation): Observable<any> {
    return this
      .http
      .put(`api/trips/configs/${operation.id}`, operation)
      .first()
      .pipe(map(res => res.json()));
  }

}
