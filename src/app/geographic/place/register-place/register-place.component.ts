import { Component, OnInit } from '@angular/core';
import { places } from '../../../shared/mocks/place';
import { areas } from '../../../shared/mocks/area';
import { Map } from '../../../shared/models/Map';

@Component({
  selector: 'sga-register-place',
  templateUrl: './register-place.component.html',
  styleUrls: ['./register-place.component.scss']
})
export class RegisterPlaceComponent implements OnInit {
  public areas: Array<any>;
  public places: Array<any>;
  public selectedTabIndex = 0;

  constructor(private map: Map) {}

  ngOnInit() {
    this.places = places;
    this.areas = areas;
    this.setupMap();
  }

  private setupMap(): void {
    this.map.createMapBoxMapInstance(true);
    this.map.setZoom(7);
    this.map.setCenter(-23.533773, -46.625290);
  }

  public onCellRightClick(event) {
    event;
  }

  public openTabRegister(event) {
    event;
  }

  public onTabSelected(event) {
    event;
  }

  public onSelected(place) {
    this.map.clearAll();
    this.map.setZoom(14);
    this.map.setCenter(place.location.latitude, place.location.longitude);

    const geometry = {
      type: 'Point',
      coordinates: [place.location.longitude, place.location.latitude]
    };

    this.map.addGeoMarker(geometry);
  }
}
