import { Injectable } from '@angular/core';

import { HttpService } from '../../shared/services/http.service';
import { Place } from '../../shared/models/Place';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class PlacesService {
  private service = 'api/places';
  constructor(private http: HttpService) { }

  public getPlaces(): Observable<Array<Place>> {
    return this
      .http
      .get(this.service)
      .pipe(map(res => <Array<Place>>res.json()));
  }

  public getPlacesByTerm(term: string): Observable<Array<Place>> {
    return this
      .http
      .get(this.service + `/search?term= ${term}`)
      .pipe(map(res => <Array<Place>>res.json()));
  }

  public postPlace(place: Place): Observable<Place> {
    return this
      .http
      .post(this.service, place)
      .pipe(map(res => <Place>res.json()));
  }
}
