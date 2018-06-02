import { Injectable } from '@angular/core';
import { Feature } from 'geojson';

import { MapStyle } from './MapStyle';
/**
 * Created by davidherod on 19/5/17.
 */

@Injectable()
export abstract class Map {
  /* Start */
  public abstract createMapBoxMapInstance(showControls?: boolean): void;

  public abstract setStyle(style: MapStyle, handle?: Function): void;

  public abstract moveTo(
    latitude: number,
    longitude: number,
    options?: any
  ): void;

  public abstract setCenter(latitude: number, longitude: number): void;

  public abstract setZoom(level: number): void;

  /** Shared **/
  public abstract addGeoJSON(geojson: any): void;

  public abstract clearAll(): void;

  /** Marker **/
  public abstract createMarker(feature: Feature<any>): L.Marker;

  public abstract addMarker(feature: Feature<any>): L.Marker;

  public abstract addCluster(markers: Array<any>): void;

  public abstract addCircle(latLng: L.LatLng): void;

  public abstract clearMarkers(): void;

  /** Drawing **/
  public abstract drawPolyline(points: Array<L.LatLng>): void;
}
