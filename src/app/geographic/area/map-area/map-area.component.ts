import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeometryObject, Feature } from 'geojson';
import { Router } from '@angular/router';

import { PlacesPipe } from '../../../shared/filters/places.pipe';
import { areas } from '../../../shared/mocks/area';
import { Map } from '../../../shared/models/Map';

@Component({
  selector: 'sga-map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.scss']
})
export class MapAreaComponent implements OnInit {
  public text: any;
  public filterDistance: any;
  public filterLocation: any;

  public originalData = new Array<any>();
  private mapLocationHistory = new Array();

  private selectedData: any;
  private _data = new Array<any>();
  private mapMarkers: Array<Feature<GeometryObject>> = [];

  @ViewChild('mapSelector') mapSelector: ElementRef;

  get data(): Array<any> {
    return this._data;
  }

  set data(value: Array<any>) {
    this._data = value;
    this.plotDataLocations();
  }

  constructor(private map: Map, private route: Router) {}

  ngOnInit(): void {
    this.injectMap();
    this._data = areas;
    this.originalData = areas;
    this.plotDataLocations();
  }

  plotDataLocations(): void {
    this.map.clearAll();
    this.mapMarkers = [];
    this._data.forEach(item => {
      if (item.location) {
        const markerBody: HTMLElement = document.createElement('div');
        const markerElement: HTMLElement = document.createElement('div');
        const imageElement: HTMLImageElement = document.createElement('img');

        imageElement.className = 'motorist-marker-image';
        imageElement.src = 'api/motorist/public/profileImage?id=' + item.id;

        markerBody.appendChild(imageElement);
        markerElement.appendChild(markerBody);
        markerBody.className = 'motorist-marker bounce';

        markerBody.addEventListener('click', () => window.alert(item.id));

        const marker: Feature<GeometryObject> = <Feature<any>>{
          type: 'Feature',
          properties: { iconSize: [50, 50], icon: markerElement },
          geometry: {
            type: 'Point',
            coordinates: [item.location.longitude, item.location.latitude]
          }
        };

        const customMarker = this.map.createMarker(marker);
        marker.properties['marker'] = customMarker;
        this.mapMarkers.push(marker);
      }
    });

    this.map.addCluster(this.mapMarkers);
  }

  plotHistoryLocations(): void {
    this.map.clearAll();
    const features: Array<Feature<GeometryObject>> = [];

    this.mapLocationHistory.map(location => {
      const feature: Feature<GeometryObject> = <Feature<any>>{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [location.longitude, location.latitude]
        }
      };
      features.push(feature);
    });
    if (features.length > 0) {
      this.map.drawPolyline(features);
      this.map.addMarker(this.createMarker(this.selectedData));
    }
  }

  createMarker(data): Feature<GeometryObject> {
    const markerBody: HTMLElement = document.createElement('div');
    const markerElement: HTMLElement = document.createElement('div');
    const imageElement: HTMLImageElement = document.createElement('img');

    imageElement.className = 'motorist-marker-image';
    imageElement.src = 'path/' + data.src;

    markerElement.appendChild(markerBody);
    markerBody.appendChild(imageElement);
    markerBody.className = 'motorist-marker bounce';

    markerBody.addEventListener('click', () => window.alert(data.id));

    const marker: Feature<GeometryObject> = <Feature<any>>{
      type: 'Feature',
      properties: { iconSize: [50, 50], icon: markerElement },
      geometry: {
        type: 'Point',
        coordinates: [data.location.longitude, data.location.latitude]
      }
    };

    return marker;
  }

  public redirectToRegister(event) {
    event
    this.route.navigateByUrl('geographic/area/register');
  }
  
  public onDataSelected(event) {
    this.data = this.originalData.filter(d => d.id === event.id);
  }

  public onPlacesFiltered(event) {
    this.filterDistance = event.distance;
    this.filterLocation = { lat: event.lat, lng: event.lng };
    this.filterDataByLocation();
  }

  private filterDataByLocation() {
    const placesFilter = new PlacesPipe();
    this.data = placesFilter.transform(this.originalData, 
      [this.filterLocation, Number(this.filterDistance), 'location.latitude', 'location.longitude']);
  }
  
  onPlacesFilterRemoved() {
    this.filterDistance = null;
    this.filterLocation = null;
    this.data = this.originalData;
  }

  private injectMap(): void {
    this.map.createMapBoxMapInstance(this.mapSelector.nativeElement);
    this.plotDataLocations();
  }
}
