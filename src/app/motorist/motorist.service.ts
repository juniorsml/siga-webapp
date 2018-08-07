import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../shared/services/http.service';
import { Motorist } from '../shared/models/api/Motorist';

@Injectable()
export class MotoristService {

  constructor(private http: HttpService) { }

  public getMotorists(): Observable<Array<Motorist>> {
    return this
      .http
      .get(`api/motorists`)
      .pipe(map(res => <Array<Motorist>>res.json()));
  }

  public saveMotorist(motorist: Motorist): Observable<any> {
    return this
      .http
      .post('api/motorists', motorist)
      .pipe(map(res => res.json()));
  }

  public associateMotorist(ids: Array<string>): Observable<any> {
    return this
      .http
      .patch('api/motorists/account/associate', ids);
  }

  public disassociateMotorist(ids: Array<string>): Observable<any> {
    return this
      .http
      .patch('api/motorists/account/disassociate', ids);
  }
}
