import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class DirectionService {
  constructor(private http: HttpService) { }

  public getCoordinates = locations =>
    this.http
      .get(this.getDirectionUri(this.formatLocationArray(locations)), null, true)
      .do(json => console.log(json))
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
    const uri = `${directionsApi}/${locations
      .toString()
      .replace(/;,/g, ';')}?&access_token=${accessToken}&overview=full`;
      console.log(uri);
    return uri;
  }

  public decode(str: string, precision?) {
    const
      coordinates = [],
      factor = Math.pow(10, precision || 5),
      features = new Array();

    let
      lat = 0,
      lng = 0,
      index = 0,
      shift = 0,
      result = 0,
      byte = null;
    // Coordinates have variable length when encoded, so just keep
    // track of whether we've hit the end of the string. In each
    // loop iteration, a single coordinate is decoded.
    while (index < str.length) {
      // Reset shift, result, and byte
      result = 0;
      byte = null;
      shift = 0;

      do {
        byte = str.charCodeAt(index++) - 63;
        // tslint:disable-next-line:no-bitwise
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      // tslint:disable-next-line:no-bitwise
      const latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

      shift = result = 0;

      do {
        byte = str.charCodeAt(index++) - 63;
        // tslint:disable-next-line:no-bitwise
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      // tslint:disable-next-line:no-bitwise
      const longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

      lat += latitude_change;
      lng += longitude_change;

      coordinates.push([lat / factor, lng / factor]);

      const point = {
        coordinates: [lng / factor, lat / factor],
        type: 'Point'
      };
      const feature = { geometry: point, type: 'Feature', properties: null };
      features.push(feature);
    }
    console.log(features);
    return features;
    // return coordinates;
  }
}
