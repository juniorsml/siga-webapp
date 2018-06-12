import { Injectable } from '@angular/core';

import { Feature, GeometryObject } from 'geojson';

import { Map } from '../models/Map';
import { environment } from '../../../environments/environment';
import { MapStyle } from '../models/MapStyle';

@Injectable()
export class MapService extends Map {
  private map: L.Map;
  private featureGroup: L.LayerGroup<any>;
  private control: L.Control;

  private markers = new Array<L.Marker>();
  private circles = new Array<any>();
  private clusters = new Array<L.LayerGroup<any>>();
  private polyLines = new Array<any>();

  public createMapBoxMapInstance(showControls = false) {
    L.mapbox.accessToken = environment.mapbox.accessToken;

    this.map = L.mapbox
      .map('map', 'mapbox.streets', this.mapboxOptions())
      .setView([-14.9034, -43.1917], 5);

    if (showControls) {
      this.addControls();
      this.setStyle(MapStyle.Street);
      this.addListeners();
    } else {
      this.setStyle(MapStyle.Outdoor);
    }
  }

  public moveTo(latitude: number, longitude: number, options?: any): void {
    this.map['flyTo']({ lat: latitude, lng: longitude }, options);
  }

  public setZoom(level: number): void {
    this.map.setZoom(level);
  }

  public setCenter(latitude: number, longitude: number): void {
    this.map.panTo(new L.LatLng(latitude, longitude));
  }

  public setStyle(style: MapStyle): void {
    L.tileLayer(
    `https://api.mapbox.com/styles/v1/mapbox/${style}/tiles/{z}/{x}/{y}?access_token=${L.mapbox.accessToken}`, {
      tileSize: 512,
      zoomOffset: -1
    })
    .redraw()
    .addTo(this.map);
  }


  public addGeoJSON(geojson) {
    L.mapbox
      .featureLayer()
      .setGeoJSON(geojson)
      .addTo(this.map);
  }

  public createMarker(feature: Feature<any>): L.Marker {
    const icon = L.divIcon({
      html: feature.properties['icon'].outerHTML,
      className: null,
      iconAnchor: [25, 50]
    });

    const marker = L.marker(
      new L.LatLng(
        feature.geometry['coordinates'][1],
        feature.geometry['coordinates'][0]
      ),
      { icon }
    );

    return marker;
  }

  public addMarker(feature: Feature<any>): L.Marker {
    const marker = this.createMarker(feature);
    marker.addTo(this.map);
    this.markers.push(marker);

    return marker;
  }

  public addCustomMarker(lat: number, lng: number, color: string, draggable: boolean): void {
    L.marker(new L.LatLng(lat, lng), {
      icon: L.mapbox.marker.icon({
        'marker-color': color
      }),
      draggable
    }).addTo(this.map);
  }

  public addControl(showControls = true): void {
    if (showControls === true) {
      this.addControls();
    } else if (this.control !== undefined) {
      this.control['remove']();
    }
  }

  public clearAll(): void {
    this.clearMarkers();
    this.circles.map(this.remove);
    this.markers.map(this.remove);
    this.polyLines.map(this.remove);
  }

  private remove = item => item.remove();

  public clearMarkers(): void {
    this.clusters.map(cluster => {
      cluster.clearLayers();
      this.map.removeLayer(cluster);
    });
  }

  public addCluster(markers: Array<Feature<GeometryObject>>): void {
    const cluster = new L['markerClusterGroup']();
    markers.map(m => cluster.addLayers(m.properties['marker']));

    this.map.addLayer(cluster);
    this.clusters.push(cluster);
  }

  public addCircle(latLng: L.LatLng): void {
    const circle = L.circleMarker(latLng, {
      color: '#ff0000',
      weight: 5
    }).addTo(this.map);

    this.circles.push(circle);
  }

  public drawPolyline(latLngs: Array<L.LatLng>) {
    if (latLngs !== null && latLngs.length > 0) {
      const polyline = L.polyline(latLngs, {
        color: '#ff0000',
        weight: 6,
        opacity: 0.6
      }).addTo(this.map);
      this.polyLines.push(polyline);

      setTimeout(() => this.map.fitBounds(polyline.getBounds()), 400);
    }
  }

  private mapboxOptions = () =>
    Object.assign({
      maxZoom: 20,
      zoomControl: false,
      worldCopyJump: true
    })

  private addListeners = () =>
    this.map.on('draw:created', (e: any) => {
      this.featureGroup.addLayer(e.layer);
      const geojson = e.layer.toGeoJSON();
      console.log(geojson);
    })

  private addControls(): void {
    this.featureGroup = new L.FeatureGroup<any>().addTo(this.map);

    if (this.control !== undefined) {
      this.control['remove']();
    }

    this.control = new L.Control['Draw']({
      position: 'topright',
      edit: {
        featureGroup: this.featureGroup
      },
      draw: {
        marker: {
          icon: L.mapbox.marker.icon({})
        }
      }
    }).addTo(this.map);

    this.addListeners();
  }
}
