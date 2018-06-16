import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Feature, GeometryObject } from 'geojson';
import { ActivatedRoute } from '@angular/router';

import { TableClickEvent } from '../../shared/components/table/table.component';
import { TabComponent } from '../../shared/components/tabs/tab/tab.component';

import { Map } from '../../shared/models/Map';
import { MapStyle } from '../../shared/models/MapStyle';

@Component({
  selector: 'sga-map-device',
  templateUrl: './map-device.component.html',
  styleUrls: ['./map-device.component.scss']
})
export class MapDeviceComponent implements OnInit {
  private _devices: Array<any>;
  private mapMarkers: Array<Feature<GeometryObject>> = [];

  public hideMotoristModal: boolean;
  public text: any;

  @ViewChild('mapSelector') mapSelector: ElementRef;
  @Input()
  get devices(): Array<any> {
    return this._devices;
  }

  set devices(value: Array<any>) {
    this._devices = value;
    if (this.mapSelectedTabIndex && this.mapSelectedTabIndex != 1) {
      this.plotMotoristLocations();
    }
  }

   public status = false;
  toggleMapType() {
    this.status = !this.status;
  }
  toggleMapStyle(mapStyle) {
    debugger;
    if (mapStyle.value === '1') {
      this.map.setStyle(MapStyle.Outdoor);
    } else {
      this.map.setStyle(MapStyle.Street);
    }
  }

  plotMotoristLocations(): void {
    this.map.clearAll();
    this.mapMarkers = [];
    this._devices.forEach(device => {
      if (device.location) {
        const markerElement: HTMLElement = document.createElement('div');
        const markerBody: HTMLElement = document.createElement('div');
        const imageElement: HTMLImageElement = document.createElement('img');

        imageElement.className = 'motorist-marker-image';
        imageElement.src = 'api/motorist/public/profileImage?id=' + device.id;

        markerElement.appendChild(markerBody);
        markerBody.appendChild(imageElement);
        markerBody.className = 'motorist-marker bounce';

        markerBody.addEventListener('click', () =>
          window.alert(device.alias + ' ' + device.model)
        );

        const marker: Feature<GeometryObject> = <Feature<any>>{
          type: 'Feature',
          properties: { iconSize: [50, 50], icon: markerElement },
          geometry: {
            type: 'Point',
            coordinates: [device.location.longitude, device.location.latitude]
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
      // this.map.drawPolyline(features);
      this.map.addMarker(this.createMotoristMarker(this.selectedMotorist));
    }
  }

  createMotoristMarker(motorist): Feature<GeometryObject> {
    const markerBody: HTMLElement = document.createElement('div');
    const markerElement: HTMLElement = document.createElement('div');
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
        coordinates: [motorist.location.longitude, motorist.location.latitude]
      }
    };

    return marker;
  }

  mapLocationHistory = new Array();

  mapSearchText: any;
  mapSelectedTabIndex: number;
  mapTabsSelectedIndex = 0;

  selectedMotorist: any;

  constructor(private map: Map, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.data.subscribe(data => (this.devices = data.devices));
    this.injectMap();
  }

  onMapTabChanged(tab: TabComponent) {
    this.mapSelectedTabIndex = tab.index;
    if (tab.index === 0) {
      this.plotMotoristLocations();
    } else if (tab.index === 1) {
      this.plotHistoryLocations();
    }
  }

  mapTableCellClick(event: TableClickEvent) {
    this.selectedMotorist = event.data;

    if (event.cellIndex === 0) {
      this.hideMotoristModal = false;
    } else {
      this.centerOnMotorist(this.selectedMotorist);
    }
  }

  centerOnMotorist(motorist) {
    if (motorist.location) {
      this.map.setZoom(12);
      // this.map.resize();
      this.map.setCenter(
        motorist.location.latitude,
        motorist.location.longitude
      );
      this.map.moveTo(motorist.location.latitude, motorist.location.longitude);
    }
  }

  mapTableCellRightClick(event: TableClickEvent) {
    this.selectedMotorist = event.data;
  }

  mapHistoryTableCellClick(event: TableClickEvent) {
    this.selectedMotorist = event.data;
    this.map.setZoom(16);
    this.map.moveTo(event.data.latitude, event.data.longitude);
  }

  onPlacesFiltered(event) {
    event;
  }

  onPlacesFilterRemoved() {}

  onContextMenu(event: TableClickEvent) {
    console.log(event);
  }

  onMapTabSelected(tab: TabComponent) {
    this.mapTabsSelectedIndex = tab.index;
  }

  private injectMap(): void {
    this.map.createMapBoxMapInstance(false);
    this.plotMotoristLocations();
  }
}
