import { Injectable } from '@angular/core';
import { Feature } from 'geojson';
/**
 * Created by davidherod on 19/5/17.
 */

@Injectable()
export abstract class Map {
  
  public abstract moveTo(
    latitude: number,
    longitude: number,
    options?: any
  ): void;
  
  public abstract setSatellite(): void;

  public abstract setCenter(latitude: number, longitude: number): void;
  
  public abstract resize(): void;

  public abstract setZoom(level: number): void;

  public abstract setBounds(bounds: any): void;

  public abstract setBoundsByMarkers(): void;

  public abstract createMapBoxMapInstance(mapElement): void;

  /** Shared **/
  public abstract clearAll(): void;

  /** Marker **/

  public abstract createMarker(feature: Feature<any>): any;

  public abstract addMarker(feature: Feature<any>): any;

  public abstract addMarkerPopUp(marker: any, text: string): any;

  public abstract addSource(id?: any, source?: any): void;

  public abstract addCluster(markers: Array<any>): void;

  public abstract removeCluster(): void;

  public abstract removeClusters(): void;

  public abstract clearMarkers(): void;

  /** Drawing **/

  public abstract drawPolyline(features: Array<Feature<any>>): void;
}
