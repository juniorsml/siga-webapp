import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

import { TabComponent } from '../../shared/components/tabs/tab/tab.component';

import { Map } from '../../shared/models/Map';

import { groups } from '../../shared/mocks/group';
import { places } from '../../shared/mocks/place';
import { areas } from '../../shared/mocks/area';
import { GroupedItems } from '../../shared/components/select-grouped/Grouped';
import { HttpService } from '../../shared/services/http.service';

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
  public itineraryPlaces = new Array<any>();
  
  public selectedArea: any;
  public selectedGroup: any;
  public selectedPlace: any;

  public formType: string;
  public selectedTabIndex = 0;
  
  public showRegister = false;
  public showSelectGroup = false;
  public showRegisterGroup = false;

  public groupedItems = new Array<GroupedItems>();
  
  constructor(private map: Map, 
              private http: HttpService) {}
  
  ngOnInit() {
    this.places = places;
    this.groups = groups;
    this.areas = areas;
    this.setupMap();
    
    const grouped = new GroupedItems();
    grouped.data = ['item A', 'item B', 'item C'];
    grouped.label = 'Title';
  
    const grouped2 = new GroupedItems();
    grouped2.data = ['item A', 'item B', 'item C'];
    grouped2.label = 'Sub';
  
    this.groupedItems.push(grouped);
    this.groupedItems.push(grouped2);
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

  private addMarker = geometry => this.map.addGeoMarker(geometry);

  private resetGroupMapView = () => this.onSelected(this.selectedGroup);

  public onPlaceSelected(location) {
    this.location = {
      latitude: location.lat(),
      longitude: location.lng()
    };

    console.log(this.location);

    this.map.clearAll();
    this.moveMap(location.lat(), location.lng(), 18);
    const geometry = this.createPoint(location.lat(), location.lng());
    this.map.addGeoMarker(geometry);
  }
  
  public onCellRightClick(event) {
    event;
  }

  public openRegister(type) {
    this.formType = type;
    this.showRegister = true;
  }

  public closeRegister(tabIndex) {
    this.showRegister = false;
    this.selectedTabIndex = tabIndex;
  }

  public onTabSelected = (tab: TabComponent) => this.selectedTabIndex = tab.index;

  public onContextMenu(event: any) {
    switch (this.selectedTabIndex)
    {
      case 0:
        this.showSelectGroup = true;
        break;

      case 1:
        this.showSelectGroup = true;
        break;

      case 2:
        this.showRegisterGroup = true;
        this.selectedGroup = event.item.data;
        this.resetGroupMapView();
        break;
    }
  }

  public closeRegisterGroup = () => this.showRegisterGroup = false;

  public onSelected(place) {
    this.map.clearAll();
    if (Array.isArray(place.location)) {
      place.location.map(loc => this.addMarker(this.createPoint(loc.latitude, loc.longitude)));
      this.moveMap(place.location[0].latitude, place.location[0].longitude, 3);
    } else if (place.location) {
      this.addMarker(this.createPoint(place.location.latitude, place.location.longitude));
      this.moveMap(place.location.latitude, place.location.longitude, 14); 
    } else {
      this.addMarker(this.createPoint(place.latitude, place.longitude));
      this.moveMap(place.latitude, place.longitude, 14);
    }
  }

  public onSelectedGroupByPlace(group) {
    if (this.selectedTabIndex === 0)
      group.location.push(this.selectedArea.data);
    else 
      group.location.push(this.selectedPlace.data);

    this.showSelectGroup = false;
  }

  public onSelectedArea = area => this.selectedArea = area;

  public onSelectedPlace = place => this.selectedPlace = place;

  public onSelectedGroup = event => this.selectedGroup.location.push(event.item);

  public registerNewGroupItem(event) {
    this.selectedGroup.location.push(event.item);
    this.resetGroupMapView();
  }

  public selectItineraryPlace = place => {
    const location = {
      name: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };

    this.itineraryPlaces.push(location);
    this.plotRoute();
    this.moveMap(location.lat, location.lng, 15);
  };

  private plotRoute = () => {
    if (this.itineraryPlaces.length > 1) {
      this.map.clearAll();
      const locations = this.formatLocationArray();
      this.itineraryPlaces.map(this.addPoint);
      const route = this.getDirectionsUri(locations);
      this.http
        .get(route)
        .map(response => response.json())
        .subscribe(
          data => this.onSuccessRoute(data),
          error => console.log(error));
    }  
  }

  private getDirectionsUri = locations => {
    const { directionsApi, accessToken } = environment.mapbox;
    return `${directionsApi}/${locations.toString().replace(/;,/g, ';')}?geometries=geojson&access_token=${accessToken}`;
  }

  private addPoint = place =>
    this.map.addLayer({
      id: this.uuid(),
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [place.lng, place.lat]
          }
        }
      },
      paint: {
        "circle-color": "#008cff",
        "circle-radius": 13,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#fff"
      }
    });

  private onSuccessRoute = data => {
    this.map.addLayer({
      id: this.uuid(),
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: data.routes[0].geometry
        }
      },
      paint: {
        'line-width': 6,
        'line-color': '#008cff'
      }
    });
  }

  private uuid = () => Date.now().toString();

  private formatLocationArray = () => 
    this.itineraryPlaces.map((loc, i) => 
      i === (this.itineraryPlaces.length - 1) ? `${loc.lng},${loc.lat}` : `${loc.lng},${loc.lat};`)

  public closeModalGroup = () => this.showSelectGroup = false;

  public create(item) {
    this.showRegister = false;
    switch (this.selectedTabIndex)
    {
      case 0:
        this.areas.push(item);
        break;

      case 1:
        this.places.push(item);
        break;

      case 2:
        this.groups.push({...item, location: []});
        break;
    } 
  }
}