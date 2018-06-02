import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class DirectionService {
  constructor(private http: HttpService) {}

  public getCoordinates = locations =>
    this.http
      .get(this.getDirectionUri(this.formatLocationArray(locations)))
      .map(response => response.json())

  private formatLocationArray = locations =>
    locations.map(
      (loc, i) =>
        i === locations.length - 1
          ? `${loc.lng},${loc.lat}`
          : `${loc.lng},${loc.lat};`
    )

  private getDirectionUri = locations => {
    const { directionsApi, accessToken } = environment.mapbox;
    return `${directionsApi}/${locations
      .toString()
      .replace(/;,/g, ';')}?geometries=geojson&access_token=${accessToken}`;
  }
}
