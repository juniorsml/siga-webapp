import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../shared/services/http.service';
import { Truck } from '../shared/models/api/Truck';

@Injectable()
export class TruckService {

  constructor(private http: HttpService) { }

  public getTrucks(): Observable<Array<Truck>> {
    return this
      .http
      .get(`api/trucks`)
      .pipe(map(res => <Array<Truck>>res.json()));
  }

  public getTruck(truckId:string): Observable<any> {
    return this
      .http
      .get(`api/trucks/${truckId}`)
      .first()
      .pipe(map(res => res.json()));
  }

  public saveTruck(truck: Truck): Observable<any> {
    return this
      .http
      .post('api/trucks', truck)
      .first()
      .pipe(map(res => res.json()));
  }

  public updateTruck(truck: Truck): Observable<any> {
    
    return this
      .http
      .put(`api/trucks/${truck.id}`, truck)
      .first()
      .pipe(map(res => res.json()));
  }

  public uploadImage(formdata: FormData): Observable<any> {
    return this
      .http
      .postFile('api/assets', formdata)
      .first()
      .pipe(map(res => res.json()));
  }

  public associateTruck(ids: Array<string>): Observable<any> {
    return this
      .http
      .patch('api/trucks/account/associate', ids);
  }

  public disassociateTruck(ids: Array<string>): Observable<any> {
    return this
      .http
      .patch('api/trucks/account/disassociate', ids);
  }
}
