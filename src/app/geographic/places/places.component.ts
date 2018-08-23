import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

import { TabComponent } from '../../shared/components/tabs/tab/tab.component';

import { Map } from '../../shared/models/Map';
import { Feature, GeometryObject } from 'geojson';

import { groups } from '../../shared/mocks/group';
import { areas } from '../../shared/mocks/area';
import { GroupedItems } from '../../shared/components/select-grouped/Grouped';
import { DirectionService } from '../../shared/services/direction.service';

import { MapStyle } from '../../shared/models/MapStyle';
import { Place } from '../../shared/models/Place';
import { PlacesService } from './places.service';

@Component({
  selector: 'sga-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  providers: [PlacesService]
})
export class RegisterPlaceComponent implements OnInit {
  private location: any;
  text: any;
  public areas: Array<any>;
  public groups: Array<any>;
  public itineraryPlaces = new Array<any>();
  public selectedArea: any;
  public selectedGroup: any;
  public selectedPlace: any;
  public formType = '';
  public selectedTabIndex = 0;
  public showRegister = false;
  public showSelectGroup = false;
  public showRegisterGroup = false;
  public toggleSidebarStatus = false;

  public groupedItems = new Array<GroupedItems>();

  private currentRay: number;
  private iconOptions = null;
  private lineOptions = null;
  private polygonOptions = null;
  private currentMarker: L.Marker;

  public status = false;
  public route: any;

  private _places: Array<any>;
  private mapMarkers: Array<Feature<GeometryObject>> = [];

  private rayGeoJson: any;
  private markerGeoJson: any;

  @Input()
  get places(): Array<any> {
    return this._places;
  }

  set places(value: Array<any>) {
    this._places = value;
    if (this.selectedTabIndex && this.selectedTabIndex !== 1) {
      this.allPlaces();
    }
  }

  toggleMapStyle(mapStyle) {
    if (mapStyle.value === '1') {
      this.map.setStyle(MapStyle.Outdoor);
    } else {
      this.map.setStyle(MapStyle.Street);
    }
  }
  toggleSidebar() {
    this.toggleSidebarStatus = !this.toggleSidebarStatus;
  }

  public allPlaces() {
    this.map.clearAll();
    this.mapMarkers = [];
    this._places.forEach(place => {
      if (place.name) {
        const markerBody: HTMLElement = document.createElement('div');
        const markerElement: HTMLElement = document.createElement('div');
        const imageElement: HTMLImageElement = document.createElement('img');

        imageElement.className = 'motorist-marker-image';
        // imageElement.src = 'api/motorist/public/profileImage?id=' + motorist.id;

        markerElement.appendChild(markerBody);
        markerBody.appendChild(imageElement);
        markerBody.className = 'motorist-marker bounce';

        markerBody.addEventListener('click', () => window.alert(place.name));

        const marker: Feature<GeometryObject> = <Feature<any>>{
          type: 'Feature',
          properties: { iconSize: [50, 50], icon: markerElement },
          geometry: {
            type: 'Point',
            coordinates: [
              place.longitude,
              place.latitude
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

  constructor(
    private map: Map,
    private placesService: PlacesService,
    private directionService: DirectionService) { }

  ngOnInit() {
    this
      .placesService
      .getPlaces()
      .subscribe(
        data => this.places = data,
        error => alert(error)
      );
    this.groups = groups;
    this.areas = areas;

    const grouped = new GroupedItems();
    grouped.data = ['item A', 'item B', 'item C'];
    grouped.label = 'Title';

    const grouped2 = new GroupedItems();
    grouped2.data = ['item A', 'item B', 'item C'];
    grouped2.label = 'Sub';

    this.groupedItems.push(grouped);
    this.groupedItems.push(grouped2);

    this.lineOptions = this.getLineOptions('#ff5e5e', '#ff5e5e');
    this.map.setLineStyle(this.lineOptions);

    this.setupMap();
  }

  private setupMap(draw = false): void {
    this.map.createMapBoxMapInstance(draw, () => this.map.setLineStyle(this.lineOptions));

    this.moveMap(
      environment.mapbox.location.latitude,
      environment.mapbox.location.longitude
    );
    // this.allPlaces();
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

  private addMarker = geometry => this.map.addGeoJSON(geometry);

  private resetGroupMapView = () => this.onSelected(this.selectedGroup);

  public onPlaceSelected(location) {
    this.location = {
      latitude: location.lat(),
      longitude: location.lng()
    };

    location = { ...location, ...this.location };

    this.moveMap(location.latitude, location.longitude, 18);
    const options = this.iconOptions ? this.iconOptions : location.options;
    this.marker(location.latitude, location.longitude, options);

    // this.addRay(location);
    // this.map.addCustomMarker(location.latitude, location.longitude, '#0049ff', true);
  }

  private addRay(location: any, ray = 1, options = this.getPolygonOptions('#ff5e5e', '#ff5e5e')) {
    const turf = window['turf'];
    const point = turf.point([location.longitude, location.latitude]);
    const buffered = turf.buffer(point, ray, { units: 'kilometers' });
    buffered.properties = options;
    this.rayGeoJson = buffered;
    this.map.addGeoJSON(buffered);
  }

  public openRegister(type) {
    this.formType = type;
    this.showRegister = true;
    this.map.addControl(true);
  }

  public closeRegister(tabIndex) {
    this.showRegister = false;
    this.map.addControl(false);
    this.selectedTabIndex = tabIndex;
  }

  public onContextMenu(event: any) {
    this.filterByTab(
      () => this.showSelectGroup = true,
      () => this.showSelectGroup = true,
      () => {
        this.showRegisterGroup = true;
        this.selectedGroup = event.item.data;
        this.resetGroupMapView();
      });
  }

  public onTabSelected = (tab: TabComponent) => {
    this.selectedTabIndex = tab.index;
    this.filterByTab(
      () => this.changeMap(true),
      () => this.changeMap(true),
      () => this.changeMap(true));
  }

  private filterByTab = (whenPlaces, whenItinerary, whenGroup) => {
    switch (this.selectedTabIndex) {
      case 0:
        whenPlaces();
        break;
      case 1:
        whenItinerary();
        break;
      case 2:
        whenGroup();
        break;
    }
  }

  public changeMap = (showControls: boolean) => {
    this.map.clearAll();
    this.map.addControl(showControls);
  }

  public closeRegisterGroup = () => {
    this.showRegisterGroup = false;
    this.map.addControl(false);
  }

  public onSelected(place) {
    this.map.clearAll();
    if (Array.isArray(place.location)) {
      place.location.map(loc => this.addMarker(this.createPoint(loc.latitude, loc.longitude)));
      this.moveMap(place.location[0].latitude, place.location[0].longitude, 3);
    } else if (place.location) {
      this.addMarker(this.createPoint(place.location.latitude, place.location.longitude));
      this.moveMap(place.location.latitude, place.location.longitude, 14);
    } else {
      const location = this.getLocation(place);
      this.addMarker(place.featureCollection);
      // this.addMarker(this.createPoint(location.latitude, location.longitude));
      this.moveMap(location.latitude, location.longitude, 14);
    }
  }

  public onSelectedGroupByPlace(group) {
    if (this.selectedTabIndex === 0) {
      group.location.push(this.selectedArea.data);
    } else {
      group.location.push(this.selectedPlace.data);
    }

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
  }

  public removeItineraryPlace = item => {
    const index = this.itineraryPlaces.findIndex(a => a === item);
    this.itineraryPlaces.splice(index, 1);
    this.plotRoute();
  }

  public addNewPlace = item => console.log(item);

  private plotRoute = () => {
    if (this.itineraryPlaces.length > 1) {
      this.map.clearAll();
      this.itineraryPlaces.map(this.addPoint);
      this.directionService
        .getCoordinates(this.itineraryPlaces)
        .subscribe(
          data => this.onSuccessRoute(data),
          error => console.log(error));
    }
  }

  private addPoint = place => this.map.addCircle(L.latLng(place.lat, place.lng));

  private onSuccessRoute = ({ routes }) => {
    const { geometry, distance, duration } = routes[0];
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

  public revertPlaces = () => {
    this.itineraryPlaces = this.itineraryPlaces.reverse();
    this.plotRoute();
  }

  public onSelectedTag = event => console.log(event);

  public marker = (lat, lng, options = null) => {
    if (this.currentMarker) { this.currentMarker['remove'](); }
    const markerBody: HTMLElement = document.createElement('div');
    const markerElement: HTMLElement = document.createElement('div');
    const iconElement: HTMLSpanElement = document.createElement('i');

    if (options) {
      iconElement.className = `icon-body fal ${options ? options.icon : ''}`;
      iconElement.style.color = options.iconColor;
      iconElement.style.background = options.backgroundColor;
      this.iconOptions = options;
    }

    markerElement.appendChild(markerBody);
    markerBody.appendChild(iconElement);
    markerBody.className = 'icon-marker bounce';

    markerBody.addEventListener('click', () => alert('op'));

    const marker: Feature<GeometryObject> = <Feature<any>>{
      type: 'Feature',
      properties: { iconSize: [50, 50], icon: markerElement },
      geometry: {
        type: 'Point',
        coordinates: [
          lng,
          lat
        ]
      }
    };
    this.markerGeoJson = marker;
    this.currentMarker = this.map.addMarker(marker);
    // const customMarker = this.map.createMarker(marker);
    // marker.properties['marker'] = customMarker;
  }

  public closeModalGroup = () => this.showSelectGroup = false;

  public draw = options => {
    const { strokeColor, fillColor } = options;
    this.lineOptions = this.getLineOptions(strokeColor, fillColor);
    this.map.setLineStyle(this.lineOptions);
    if (this.location) {
      this.marker(this.location.latitude, this.location.longitude, options);
      if (this.currentRay > 0) {
        this.map.clearLayers();
        this.polygonOptions = this.getPolygonOptions(strokeColor, fillColor);
        this.addRay(this.location, this.currentRay, this.polygonOptions);
      }
    }
  }

  public onRayChanged = event => {
    if (event > 0) {
      const ray = event / 1000;
      this.map.clearLayers();
      this.polygonOptions !== null ?
        this.addRay(this.location, ray, this.polygonOptions) :
        this.addRay(this.location, ray);
      this.currentRay = ray;
    }
  }

  public create(item) {
    item.featureCollection = this.getFeatureCollection();
    this.showRegister = false;

    const { key_customer, id_customer, entityType } = item;

    const clientIds = {};
    clientIds[key_customer] = id_customer;

    const featureStyle = {
      colorIcon: item.colorIcon,
      backgroundColor: item.backgroundColor,
      fillColor: item.fillColor,
      strokeColor: item.strokeColor,
      ...this.getPolygonOptions(item.strokeColor, item.fillColor)
    };

    const place = Place.create(
      item.name,
      item.description,
      clientIds,
      featureStyle,
      entityType,
      item.documentId,
      item.tags,
      item.featureCollection);

      console.warn(place);

      this
        .placesService
        .postPlace(place)
        .subscribe(
          success => this.onPlaceSuccess(success),
          error => this.onPlaceError(error)
        );

    // switch (this.selectedTabIndex) {
    //   case 0:
    //     this.areas.push(item);
    //     break;

    //   case 1:
    //     this.places.push(item);
    //     break;

    //   case 2:
    //     this.groups.push({ ...item, location: [] });
    //     break;
    // }
  }

  private onPlaceSuccess(place) {
    this.places.push(place);
    this.showRegister = false;
  }

  private onPlaceError(error) {
    alert(error);
  }

  private getLocation(place) {
    if (!place.featureCollection) { return null; }

    const coordinates = place.featureCollection.features.filter(p => p.geometry.type === 'Point')[0].geometry.coordinates;
    return {
      latitude: coordinates[1],
      longitude: coordinates[0]
    };
  }

  private getFeatureCollection() {
    return {
      type: 'FeatureCollection',
      features: [
        this.markerGeoJson,
        this.rayGeoJson
      ]
    };
  }

  private getLineOptions = (stroke, fill) => Object.assign({
    fill: true,
    stroke: true,
    color: stroke,
    fillColor: fill
  })

  private getPolygonOptions = (stroke, fill) => Object.assign({
    fill, // line
    stroke, // back
    'stroke-width': 2,
    'fill-opacity': 0.5,
    'stroke-opacity': 0.5
  })
}
