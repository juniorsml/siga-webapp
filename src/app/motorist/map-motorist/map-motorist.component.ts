import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import {} from 'leaflet-marker-cluster';

import { Map } from '../../shared/models/Map';
import { TabComponent } from '../../shared/components/tabs/tab/tab.component';
import { Feature, GeometryObject } from 'geojson';

@Component({
  selector: 'sga-map-motorist',
  templateUrl: './map-motorist.component.html',
  styleUrls: ['./map-motorist.component.scss']
})
export class MapMotoristComponent implements OnInit {
  private _motorists: Array<any>;
  private mapMarkers: Array<Feature<GeometryObject>> = [];

  @ViewChild('mapSelector') mapSelector: ElementRef;
  @Input()
  get motorists(): Array<any> {
    return this._motorists;
  }

  set motorists(value: Array<any>) {
    this._motorists = value;
    if (this.mapSelectedTabIndex && this.mapSelectedTabIndex != 1) {
      this.plotMotoristLocations();
    }
  }

  plotMotoristLocations(): any {
    this.map.clearAll();
    this.mapMarkers = [];
    this._motorists.forEach(motorist => {
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

        const marker : Feature<GeometryObject> = <Feature<any>>{
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

    // Add cluster
    this.map.addCluster(this.mapMarkers);
  }

  mapLocationHistory = new Array();

  mapSearchText: any;
  mapSelectedTabIndex: number;
  mapTabsSelectedIndex: number = 0;

  selectedMotorist: any;

  constructor(private map: Map) {}

  ngOnInit(): void {
    this.injectMap();
  }

  onMapTabChanged(tab: TabComponent) {
    this.mapSelectedTabIndex = tab.index;
    switch (tab.index) {
    case 0:
        this.plotMotoristLocations();
        break;
    case 1:
        //this.plotHistoryLocations();
        break;
    }
  }

  mapTableCellClick(event) {
    console.log(event);
  }

  mapTableCellRightClick(event) {
    console.log(event);
  }

  mapHistoryTableCellClick(event) {
    console.log(event);
  }

  onContextMenu(event) {
    console.log(event);
  }

  onMapTabSelected(tab: TabComponent) {
    this.mapTabsSelectedIndex = tab.index;
  }

  private injectMap(): void {
    this.map.createMapBoxMapInstance(this.mapSelector.nativeElement);
    this.plotMotoristLocations();
  }
}
