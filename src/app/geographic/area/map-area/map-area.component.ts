import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { GeometryObject, Feature } from 'geojson';
import { Map } from '../../../shared/models/Map';

@Component({
  selector: 'sga-map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.scss']
})
export class MapAreaComponent implements OnInit {

  private _data: Array<any>;
  private mapMarkers: Array<Feature<GeometryObject>> = [];

  public text: any;

  @ViewChild('mapSelector') mapSelector: ElementRef;

  @Input()
  get data(): Array<any> {
    return this._data;
  }

  set data(value: Array<any>) {
    this._data = value;
    this.plotDataLocations();
  }

  plotDataLocations(): void {
    this.map.clearAll();
    this.mapMarkers = [];
    this._data.forEach(motorist => {
      if (motorist.location) {
        const markerElement: HTMLElement = document.createElement('div');
        const markerBody: HTMLElement = document.createElement('div');
        const imageElement: HTMLImageElement = document.createElement('img');

        imageElement.className = 'motorist-marker-image';
        imageElement.src = 'api/motorist/public/profileImage?id=' + motorist.id;

        markerElement.appendChild(markerBody);
        markerBody.appendChild(imageElement);
        markerBody.className = 'motorist-marker bounce';

        markerBody.addEventListener('click', () =>
          window.alert(motorist.firstName + ' ' + motorist.lastName)
        );

        const marker: Feature<GeometryObject> = <Feature<any>>{
          type: 'Feature',
          properties: { iconSize: [50, 50], icon: markerElement },
          geometry: {
            type: 'Point',
            coordinates: [
              motorist.location.longitude,
              motorist.location.latitude
            ]
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

  mapLocationHistory = new Array();

  mapSearchText: any;
  mapSelectedTabIndex: number;

  private selectedData: any;

  constructor(private map: Map) {}

  ngOnInit(): void {
    this.injectMap();
  }

  onPlacesFiltered(event) {
    event;
  }

  onPlacesFilterRemoved() {}

  private injectMap(): void {
    this.map.createMapBoxMapInstance(this.mapSelector.nativeElement);
    this.plotDataLocations();
  }
}
