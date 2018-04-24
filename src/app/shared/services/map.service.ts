import { Injectable } from '@angular/core';

import { Feature, GeometryObject } from 'geojson';
import LatLngBounds = L.LatLngBounds;
import LatLng = L.LatLng;
import Marker = L.Marker;
import Polyline = L.Polyline;

import { Map } from '../models/Map';
import { environment } from '../../../environments/environment';

@Injectable()
export class MapService extends Map {

  private markers: Array<Marker> = [];
  private polyLines: Array<Polyline> = [];
  private clusters: Array<any> = [];
  private map: L.Map;

  public clearAll(): void {
    this.clearMarkers();
    this.removeClusters();
    this.removePolyLines();
  }

  public clearMarkers(): void {
    // this.markers.forEach(marker => marker.remove());
  }

  public addCluster(points: Array<Feature<GeometryObject>>): void {
    const markers = L['markerClusterGroup']();
    points.map(p => {
      const latLng = p.properties.marker.getLatLng();
      var marker = L.marker(new L.LatLng(latLng.lat, latLng.lng), {title: 'Title'});
      marker.bindPopup('Title');
      markers.addLayer(marker);
    })
    this.map.addLayer(markers);


    // const cluster = new L['MarkerClusterGroup']();

    // markers.map(m => cluster.addLayers(m.properties['marker']));

    // this.map.addLayer(cluster);
    // this.clusters.push(cluster);
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

  public createMapBoxMapInstance(mapElement) {
    // L.mapbox.accessToken =
    //   'pk.eyJ1IjoiY29uZHVzaXQiLCJhIjoiY2oyeG1wcjJuMDExNTJ4cThlemU3NWlsNCJ9.d1o1-L4u4_-aY_uvAn5krQ';
    this.map = L.map(mapElement, {maxZoom: 20}).setView([-14.9034, -43.1917], 5);

    L['mapboxGL']({
      accessToken: environment.mapbox.accessToken, 
      style: 'mapbox://styles/mapbox/outdoors-v10?optimize=true'
    }).addTo(this.map);

    // this.map = L
    //   .map(this.mapElement, {
    //     zoomControl: false,
    //     worldCopyJump: true
    //   })
    //   .setView([-14.9034, -43.1917], 5)
    //   .addLayer(
    //     L.tileLayer(
    //       'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY29uZHVzaXQiLCJhIjoiY2oyeG1wcjJuMDExNTJ4cThlemU3NWlsNCJ9.d1o1-L4u4_-aY_uvAn5krQ'
    //     )
    //   );
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
    var myIcon = L.divIcon({
      html: feature.properties['icon'].outerHTML,
      className: null,
      iconAnchor: [25, 50]
    });
    var marker = L.marker(
      new LatLng(
        feature.geometry['coordinates'][1],
        feature.geometry['coordinates'][0]
      ),
      { icon: myIcon }
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

  public setSatellite(): void {
    L['mapboxGL']({
      accessToken: environment.mapbox.accessToken, 
      style: 'mapbox://styles/mapbox/satellite-streets-v10?optimize=true'
    }).addTo(this.map);
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
