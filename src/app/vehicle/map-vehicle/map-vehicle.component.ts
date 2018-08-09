import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Map } from '../../shared/models/Map';
import { TabComponent } from '../../shared/components/tabs/tab/tab.component';
import { Feature, GeometryObject } from 'geojson';
import { TableClickEvent } from '../../shared/components/table/table.component';

import { ActivatedRoute } from '@angular/router';
import { MapStyle } from '../../shared/models/MapStyle';

@Component({
  selector: 'sga-map-vehicle',
  templateUrl: './map-vehicle.component.html',
  styleUrls: ['./map-vehicle.component.scss']
})
export class MapVehicleComponent implements OnInit {
  private _vehicles: Array<any>;
  private mapMarkers: Array<Feature<GeometryObject>> = [];

  public hideVehicleModal: boolean;
  public text: any;

  public status: boolean = false;
  toggleMapType() {
    this.status = !this.status;
  }
  toggleMapStyle(mapStyle) {
    if (mapStyle.value === "1") {
      this.map.setStyle(MapStyle.Outdoor);
    } else {
      this.map.setStyle(MapStyle.Street);
    }
  }

  @ViewChild('mapSelector') mapSelector: ElementRef;
  @Input()
  get vehicles(): Array<any> {

    return this._vehicles;

  }

  set vehicles(value: Array<any>) {
    this._vehicles = value;
    if (this.mapSelectedTabIndex && this.mapSelectedTabIndex != 1) {
      this.plotVehicleLocations();
    }
  }

  plotVehicleLocations(): void {
    this.map.clearAll();
    this.mapMarkers = [];
    this._vehicles.forEach(vehicle => {
      if (vehicle.location) {
        const markerElement: HTMLElement = document.createElement('div');
        const markerBody: HTMLElement = document.createElement('div');
        const imageElement: HTMLImageElement = document.createElement('img');

        imageElement.className = 'motorist-marker-image';
        imageElement.src = 'api/motorist/public/profileImage?id=' + vehicle.id;

        markerElement.appendChild(markerBody);
        markerBody.appendChild(imageElement);
        markerBody.className = 'motorist-marker bounce';

        markerBody.addEventListener('click', () =>
          window.alert(vehicle.vehiclePlate + ' ' + vehicle.model)
        );

        const marker: Feature<GeometryObject> = <Feature<any>>{
          type: 'Feature',
          properties: { iconSize: [50, 50], icon: markerElement },
          geometry: {
            type: 'Point',
            coordinates: [
              vehicle.location.longitude,
              vehicle.location.latitude
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
      // this.map.drawPolyline(features);
      this.map.addMarker(this.createVehicleMarker(this.selectedVehicle));
    }
  }

  createVehicleMarker(vehicle): Feature<GeometryObject> {
    const markerBody: HTMLElement = document.createElement('div');
    const markerElement: HTMLElement = document.createElement('div');
    const imageElement: HTMLImageElement = document.createElement('img');

    imageElement.className = 'motorist-marker-image';
    imageElement.src = 'api/motorist/public/profileImage?id=' + vehicle.id;

    markerElement.appendChild(markerBody);
    markerBody.appendChild(imageElement);
    markerBody.className = 'motorist-marker bounce';

    markerBody.addEventListener('click', () => window.alert(vehicle.ownerName + ' ' + vehicle.vehiclePlate));

    const marker: Feature<GeometryObject> = <Feature<any>>{
      type: 'Feature',
      properties: { iconSize: [50, 50], icon: markerElement },
      geometry: {
        type: 'Point',
        coordinates: [vehicle.location.longitude, vehicle.location.latitude]
      }
    };

    return marker;
  }

  mapLocationHistory = new Array();

  mapSearchText: any;
  mapSelectedTabIndex: number;
  mapTabsSelectedIndex: number = 0;

  selectedVehicle: any;

  constructor(private map: Map, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => this.vehicles = data.vehicles);
    this.injectMap();
  }

  onMapTabChanged(tab: TabComponent) {
    this.mapSelectedTabIndex = tab.index;
    if (tab.index === 0) {
      this.plotVehicleLocations();
    } else if (tab.index === 1) {
      this.plotHistoryLocations();
    }
  }

  mapTableCellClick(event: TableClickEvent) {
    this.selectedVehicle = event.data;

    if (event.cellIndex === 0) {
      this.hideVehicleModal = false;
    } else {
      this.centerOnVehicle(this.selectedVehicle);
    }
  }

  centerOnVehicle(vehicle) {
    if (vehicle.location) {
      this.map.setZoom(12);
      // this.map.resize();
      this.map.setCenter(
        vehicle.location.latitude,
        vehicle.location.longitude
      );
      this.map.moveTo(vehicle.location.latitude, vehicle.location.longitude);
    }
  }

  mapTableCellRightClick(event: TableClickEvent) {
    this.selectedVehicle = event.data;
  }

  mapHistoryTableCellClick(event: TableClickEvent) {
    this.selectedVehicle = event.data;
    this.map.setZoom(16);
    this.map.moveTo(event.data.latitude, event.data.longitude);
  }

  onPlacesFiltered(event) {
    event
  }

  onPlacesFilterRemoved() {

  }

  onContextMenu(event: TableClickEvent) {
    console.log(event);
  }

  onMapTabSelected(tab: TabComponent) {
    this.mapTabsSelectedIndex = tab.index;
  }

  private injectMap(): void {
    this.map.createMapBoxMapInstance(false);
    this.plotVehicleLocations();
  }
}

