import { Injectable } from '@angular/core';

import { Feature, GeometryObject } from 'geojson';

import { Map } from '../models/Map';
import { environment } from '../../../environments/environment';
import { MapStyle } from '../models/MapStyle';

@Injectable()
export class MapService extends Map {
  private map: L.Map;
  private control: L.Control;
  private featureGroup: L.LayerGroup<any>;

  private layers = new Array<any>();
  private markers = new Array<L.Marker>();
  private circles = new Array<any>();
  private clusters = new Array<L.LayerGroup<any>>();
  private polyLines = new Array<any>();

  private tile: any;
  private lineStyle: any;
  private lastLayer: any;

  public createMapBoxMapInstance(showControls = false, onDraw = null) {
    L.mapbox.accessToken = environment.mapbox.accessToken;

    this.map = L.mapbox
      .map('map', 'mapbox.streets', this.mapboxOptions())
      .setView([-14.9034, -43.1917], 5);

    if (showControls) {
      this.addControls();
      this.setStyle(MapStyle.Street);
      this.addListeners(onDraw);
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
    if (this.tile) { this.tile.removeFrom(this.map); }

    this.tile = L.tileLayer(
      `https://api.mapbox.com/styles/v1/mapbox/${style}/tiles/{z}/{x}/{y}?access_token=${L.mapbox.accessToken}`, {
        tileSize: 512,
        zoomOffset: -1
      })
      .redraw()
      .addTo(this.map);
  }


  public addGeoJSON(geojson) {
    const geo = L.mapbox
      .featureLayer()
      .setGeoJSON(geojson)
      .addTo(this.map);
    this.layers.push(geo);
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
      { icon, draggable: true }
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
    this.layers.map(this.remove);
    this.circles.map(this.remove);
    this.markers.map(this.remove);
    this.polyLines.map(this.remove);

    if (this.featureGroup !== undefined) {
      this.featureGroup.clearLayers();
    }
  }

  private remove = item => item.remove();

  public clearMarkers(): void {
    this.clusters.map(cluster => {
      cluster.clearLayers();
      this.map.removeLayer(cluster);
    });
  }

  public clearLayers() {
    this.layers.map(this.remove);
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

  public setLineStyle(options: any) {
    this.lineStyle = options;
    if (this.featureGroup !== undefined && this.featureGroup.getLayers().length > 0) {
      const geojson = this.featureGroup.toGeoJSON();
      this.geojsonToLayer(geojson, this.lastLayer);
    }
  }

  private mapboxOptions = () =>
    Object.assign({
      maxZoom: 20,
      zoomControl: false,
      worldCopyJump: true
    })

  private addListeners = (onDraw = undefined) =>
    this.map.on('draw:created', (e: any) => {
      onDraw === undefined ?
        console.warn('onDraw is undefined') :
        onDraw();
      const layer = this.featureGroup.addLayer(e.layer);
      this.lastLayer = layer;
      const geojson = this.featureGroup.toGeoJSON();
      this.geojsonToLayer(geojson, layer);
      console.log(geojson);
    })

  private geojsonToLayer = (geojson, layer) => {
    layer.clearLayers();
    const add = l => l.addTo(layer);
    L.geoJson(geojson, {
      style: () => {
        return { ...this.lineStyle };
      }
    }).eachLayer(add);
  }

  private addControls(): void {
    this.featureGroup = new L.FeatureGroup().addTo(this.map);

    if (this.control !== undefined) {
      this.control['remove']();
    }

    this.control = new L.Control['Draw']({
      position: 'topright',
      edit: {
        featureGroup: this.featureGroup
      },
      draw: {
        circle: false,
        marker: false
      }
    }).addTo(this.map);

    this.addListeners();
  }
}
