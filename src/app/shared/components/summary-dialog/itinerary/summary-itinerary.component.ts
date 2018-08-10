import { Component, OnInit } from '@angular/core';
import { Map } from '../../../models/Map';

import { DirectionService } from '../../../services/direction.service';

@Component({
  selector: 'sga-summary-itinerary',
  templateUrl: './summary-itinerary.component.html',
  styleUrls: ['./summary-itinerary.component.scss']
})

export class SummaryItineraryComponent implements OnInit {

  public places = new Array<any>();
  public route: any;

  constructor(private map: Map, private directionService: DirectionService) { }

  ngOnInit(): void {
    this.injectMap();
  }

  public selectPlace = place => {
    const location = {
      name: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };

    this.places.push(location);
    this.plotRoute();
    this.moveMap(location.lat, location.lng, 15);
  }

  public addPlace = item => console.log(item);

  public removePlace = item => {
    const index = this.places.findIndex(a => a === item);
    this.places.splice(index, 1);
    this.plotRoute();
  }

  public revertPlaces = () => {
    this.places = this.places.reverse();
    this.plotRoute();
  }

  private moveMap = (lat: number, lng: number, zoom = 7) => {
    this.map.setZoom(zoom);
    this.map.setCenter(lat, lng);
  }

  private plotRoute = () => {
    if (this.places.length > 1) {
      this.map.clearAll();
      this.places.map(this.addPoint);
      this.directionService
        .getCoordinates(this.places)
        .subscribe(
          data => this.onSuccessRoute(data),
          error => console.log(error));
    }
  }

  private onSuccessRoute = data => {
    const { geometry, distance, duration } = data.routes[0];
    this.route = { distance: this.formatToKm(distance), duration: this.formatDate(duration) };

    const featureList = this.directionService.decode(geometry);
    const latLngs = featureList.map(feat => L.latLng(feat.geometry.coordinates[1], feat.geometry.coordinates[0]));
    this.map.drawPolyline(latLngs);
  }

  private formatToKm = meters => (meters / 1000).toFixed(1);

  private formatDate = seconds => {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  private injectMap = () => this.map.createMapBoxMapInstance();

  private addPoint = place => this.map.addCircle(L.latLng(place.lat, place.lng));

  
}