import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

import { TabComponent } from '../../shared/components/tabs/tab/tab.component';

import { Map } from '../../shared/models/Map';

import { groups } from '../../shared/mocks/group';
import { places } from '../../shared/mocks/place';
import { areas } from '../../shared/mocks/area';

@Component({
  selector: 'sga-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class RegisterPlaceComponent implements OnInit {
  private location: any;
  public areas:  Array<any>;
  public places: Array<any>;
  public groups: Array<any>;
  public showRegister = true;
  public selectedTabIndex = 0;

  constructor(private map: Map) {}

  ngOnInit() {
    this.places = places;
    this.groups = groups;
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

  private addMarker(geometry) {
    this.map.addGeoMarker(geometry);
  }

  public onPlaceSelected(location) {
    this.location = {
      latitude: location.lat(),
      longitude: location.lng()
    };

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

  public closeRegister(tabIndex) {
    this.showRegister = false;
    this.selectedTabIndex = tabIndex;
  }

  public onTabSelected(tab: TabComponent) {
    this.selectedTabIndex = tab.index;
  }

  public onSelected(place) {
    this.map.clearAll();
    if (Array.isArray(place.location)) {
      place.location.map(loc => this.addMarker(this.createPoint(loc.latitude, loc.longitude)));
      this.moveMap(place.location[0].latitude, place.location[0].longitude, 3);
    } else {
      this.addMarker(this.createPoint(place.location.latitude, place.location.longitude));
      this.moveMap(place.location.latitude, place.location.longitude, 14);
    }
  }

  public createPlace(place) {
    place.location = this.location;
    console.log(place);
  }
}
