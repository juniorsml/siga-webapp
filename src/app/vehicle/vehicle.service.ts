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

  public saveVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this
      .http
      .post('api/vehicles', vehicle)
      .pipe(map(res => res.json()));
  }

  public uploadImage(formdata: FormData): Observable<any> {
    return this
      .http
      .postFile('api/assets', formdata)
      .first()
      .pipe(map(res => res.json()));
  }

  public updateVehicle(vehicle: Vehicle): Observable<any> {
    return this
      .http
      .put(`api/vehicles/${vehicle.id}`, vehicle)
      .first()
      .pipe(map(res => res.json()));
  }


  public associateVehicle(ids: Array<string>): Observable<any> {
    return this
      .http
      .patch('api/vehicles/account/associate', ids);
  }

  public disassociateVehicle(ids: Array<string>): Observable<any> {
    return this
      .http
      .patch('api/vehicles/account/disassociate', ids);
  }
}
