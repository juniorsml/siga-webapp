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
      .get(`api/trailers`)
      .pipe(map(res => <Array<Truck>>res.json()));
  }

  public getTruck(trailerId: string): Observable<any> {
    return this
      .http
      .get(`api/trailers/${trailerId}`)
      .first()
      .pipe(map(res => res.json()));
  }

  public saveTruck(trailer: Truck): Observable<any> {
    return this
      .http
      .post('api/trailers', trailer)
      .first()
      .pipe(map(res => res.json()));
  }

  public updateTruck(trailer: Truck): Observable<any> {
    
    return this
      .http
      .put(`api/trailers/${trailer.id}`, trailer)
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
      .patch('api/trailers/account/associate', ids);
  }

  public disassociateTruck(ids: Array<string>): Observable<any> {
    return this
      .http
      .patch('api/trailers/account/disassociate', ids);
  }
}
