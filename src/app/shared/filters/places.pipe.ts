import { Pipe, PipeTransform } from '@angular/core';
/*
 * Filters out data based geolocation
 */
@Pipe({
  name: 'placesFilter',
  pure: false
})
export class PlacesPipe implements PipeTransform {
  transform(object: any, args: any) {
    if (
      object != null &&
      args != null &&
      args[0] != null &&
      args[1] != null &&
      args[2] != null &&
      args[3] != null
    ) {
      return object.filter(item => {
        const location = this.getLocation(item, [args[2], args[3]]);
        // if location is missing remove from filter
        if (location === null) {
          return false;
        }
        return (
          args[1] >=
          this.calculateDistance(
            location.lat,
            location.long,
            args[0].lat,
            args[0].lng,
            'K'
          )
        );
      });
    } else {
      return object;
    }
  }

  calculateDistance(lat1, lon1, lat2, lon2, unit) {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }

  getLocation(item: Object, keys: Array<string>) {
    let object: any = item;
    const locations = [];

    for (let i = 0; i < keys.length; i++) {
      const nodes = keys[i].split('.');
      object = item;
      // return null if there is no location
      if (object == null) {
        return null;
      }
      for (let i = 0; i < nodes.length; i++) {
        object = object[nodes[i]];
        // return null if there is no location
        if (object === null) {
          return null;
        }
      }
      locations.push(object);
    }
    return { lat: locations[0], long: locations[1] };
  }
}
