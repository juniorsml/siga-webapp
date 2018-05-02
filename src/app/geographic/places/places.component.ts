import { Component, OnInit } from '@angular/core';
import { places } from '../../shared/mocks/place';
import { areas } from '../../shared/mocks/area';
import { Map } from '../../shared/models/Map';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'sga-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class RegisterPlaceComponent implements OnInit {
  public areas: Array<any>;
  public places: Array<any>;
  public selectedTabIndex = 0;
  public showRegister = true;

  constructor(private map: Map) {}

  ngOnInit() {
    this.places = places;
    this.areas = areas;
    this.setupMap();
  }

  private setupMap(): void {
    this.map.createMapBoxMapInstance(true);
    this.moveMap(
      environment.mapbox.location.latitude,
      environment.mapbox.location.longitude
    );
  }

  private moveMap(lat: number, lng: number, zoom = 7) {
    this.map.setZoom(zoom);
    this.map.setCenter(lat, lng);
  }

  private createPoint(lat: number, lng: number): any {
    return {
      type: 'Point',
      coordinates: [lng, lat]
    };
  }

  public onPlaceSelected(location) {
    this.map.clearAll();
    this.moveMap(location.lat(), location.lng(), 18);
    const geometry = this.createPoint(location.lat(), location.lng());
    this.map.addGeoMarker(geometry);
  }
  
  public onCellRightClick(event) {
    event;
  }


  public openRegister() {
    this.showRegister = true;
  }

  public closeRegister() {
    this.showRegister = false;
  }

  public onTabSelected(event) {
    event;
  }

  public onSelected(place) {
    this.map.clearAll();
    this.map.setZoom(14);
    this.map.setCenter(place.location.latitude, place.location.longitude);

    const geometry = this.createPoint(
      place.location.latitude,
      place.location.longitude
    );
    this.map.addGeoMarker(geometry);
  }
}
