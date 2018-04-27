import { Injectable } from '@angular/core';

import { Feature, GeometryObject } from 'geojson';
import LatLngBounds = L.LatLngBounds;
import LatLng = L.LatLng;
import Marker = L.Marker;
import Polyline = L.Polyline;

import { Map } from '../models/Map';
import { environment } from '../../../environments/environment';
import { MapStyle } from '../models/MapStyle';

@Injectable()
export class MapService extends Map {

  private markers: Array<Marker> = [];
  private polyLines: Array<Polyline> = [];
  private clusters: Array<any> = [];
  private map: any;

  public clearAll(): void {
    this.clearMarkers();
    this.removeClusters();
    this.removePolyLines();
  }

  public clearMarkers(): void {
    // this.markers.forEach(marker => marker.remove());
  }

  public addCluster(markers: Array<Feature<GeometryObject>>): void {
    const cluster = new L['markerClusterGroup']();
    markers.map(m => cluster.addLayers(m.properties['marker']));

    this.map.addLayer(cluster);
    this.clusters.push(cluster);
  }

  public removeClusters() {
    this.clusters.forEach(cluster => {
      cluster.clearLayers();
      this.map.removeLayer(cluster);
    });
  }

  public removeCluster() {
    //todo
  }

  public createMapBoxMapInstance(showControls?: boolean) {
    this.map = L
    .map('map', {
      maxZoom: 20,
      zoomControl: false,
      worldCopyJump: true
    })
    .setView([-14.9034, -43.1917], 5);

    if (showControls) {
      this.addDraw(MapStyle.Street);
    } else {
      this.setStyle(MapStyle.Outdoor);
    }

  }

  public addSource(): void {}

  public setBounds(markers: Array<Feature<any>>): void {
    let lat: number = markers[0].geometry.coordinates[1];
    let lng: number = markers[0].geometry.coordinates[0];

    var bounds = new LatLngBounds(new LatLng(lat, lng), new LatLng(lat, lng));

    setTimeout(() => {
      markers.forEach(function(feature) {
        bounds.extend(
          new LatLng(
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0]
          )
        );
      });
      this.map.fitBounds(bounds);
    }, 1);
  }

  public moveTo(): void {
    // this.map.flyTo({ lat: latitude, lng: longitude });
  }

  setZoom(level: number): void {
    this.map.setZoom(level);
  }

  setCenter(latitude: number, longitude: number): void {
    this.map.panTo(new LatLng(latitude, longitude));
  }

  drawPolyline(points: Array<Feature<any>>): void {
    var latLngs: Array<LatLng> = [];
    points.forEach(point => {
      let latLng: LatLng = L.latLng(
        point.geometry.coordinates[1],
        point.geometry.coordinates[0]
      );
      latLngs.push(latLng);
      point;
    });
    if (points != null && points.length > 0) {
      // const polyline = L.polyline(latLngs, {
      //   color: '#ff0000',
      //   weight: 6,
      //   opacity: 0.7
      // }).addTo(this.map);

      // this.polyLines.push(polyline);

      this.setBounds(points);
    }
  }

  removePolyLines(): void {
    this.polyLines.forEach(polyline => {
      this.map.removeLayer(polyline);
    });
  }

  resize() {
    // setTimeout(() => {
    //   this.map.invalidateSize();
    // }, 1);
  }

  createMarker(feature: Feature<any>): Marker {
    // const myIcon = L.divIcon({
    //   html: feature.properties['icon'].outerHTML,
    //   className: null,
    //   iconAnchor: [25, 50]
    // });
    const marker = L.marker(
      new LatLng(
        feature.geometry['coordinates'][1],
        feature.geometry['coordinates'][0]
      )
    );
    this.markers.push(marker);
    return marker;
  }

  public addMarker(feature: Feature<any>): any {
    const marker: Marker = this.createMarker(feature);
    marker.addTo(this.map);
    this.markers.push(marker);

    return marker;
    //this.markers.push(this.createMarker(feature).addTo(this.map));
  }

  public setStyle(style: MapStyle): void {
    L['mapboxGL']({
      accessToken: environment.mapbox.accessToken, 
      style: `mapbox://styles/mapbox/${style}?optimize=true`
    }).addTo(this.map);
  }

  private addDraw(style: MapStyle): void {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/mapbox/${style}?optimize=true` 
    });
      
    const draw = new window['MapboxDraw']({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });

    this.map.addControl(draw);

    const updateArea = () => {
      const data = draw.getAll();
      debugger
      if (data.features.length > 0) {
          // var area = window['turf'].area(data);
          // restrict to area to 2 decimal points
          // var rounded_area = Math.round(area*100)/100;
      }
    };

    this.map.on('draw.create', updateArea);
    this.map.on('draw.delete', updateArea);
    this.map.on('draw.update', updateArea);
  }

  addMarkerPopUp(marker: Marker, text: string) {
    marker.bindPopup(text);
  }

  setBoundsByMarkers() {
    if (this.markers != null && this.markers.length > 0) {
      let latLng: LatLng = this.markers[0].getLatLng();
      var bounds = new LatLngBounds(latLng, latLng);
      this.markers.forEach(marker => {
        bounds.extend(marker.getLatLng());
      });
      setTimeout(() => {
        this.map.fitBounds(bounds);
      }, 1);
    }
  }
}
