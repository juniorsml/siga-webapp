import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../shared/services/http.service';
import { Vehicle } from '../shared/models/api/Vehicle';

@Injectable()
export class VehicleService {

  constructor(private http: HttpService) { }

  public getVehicles(): Observable<Array<Vehicle>> {
    return this
      .http
      .get(`api/vehicles`)
      .pipe(map(res => <Array<Vehicle>>res.json()));
  }

  public saveVehicle(motorist: Vehicle): Observable<Vehicle> {
    return this
      .http
      .post('api/vehicles', motorist)
      .pipe(map(res => res.json()));
  }

  public associateVehicle(ids: Array<string>): Observable<Vehicle> {
    return this
      .http
      .patch('api/vehicles/account/associate', JSON.stringify(ids));
  }

  public disassociateVehicle(ids: Array<string>): Observable<Vehicle> {
    return this
      .http
      .patch('api/vehicles/account/disassociate', JSON.stringify(ids));
  }
}
