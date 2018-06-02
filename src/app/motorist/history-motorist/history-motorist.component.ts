import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Map } from '../../shared/models/Map';
import { motorists } from '../../shared/mocks/motorist';
import { environment } from '../../../environments/environment';
import { DirectionService } from '../../shared/services/direction.service';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';

@Component({
  selector: 'sga-history-motorist',
  templateUrl: './history-motorist.component.html',
  styleUrls: ['./history-motorist.component.scss']
})
export class HistoryMotoristComponent implements OnInit {

  public motoristsList: Array<any> = motorists;

  public currentPage: number = 1;
  public pageQuantity: number = 6;

  public selectedMotorist: any;

  public showHistoryDetail = false;

  constructor(
    private map: Map,
    private router: ActivatedRoute,
    private _router: Router,
    private directionService: DirectionService
  ) {}
  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

  ngOnInit() {
    this.setupMap();
    this.router.params.subscribe(data => this.plotRoute(data.id));
    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      alwaysVisible: false,
      gridOpacity: '0.2',
      barOpacity: '0.5',
      gridBackground: '#ccc',
      gridWidth: '5',
      gridMargin: '2px 2px',
      barBackground: 'rgba(55, 56, 58, 0.6)',
      barWidth: '4',
      barMargin: '2px 2px'
    };

    if (this.selectedMotorist !== undefined)
      this.showHistoryDetail = true;
  }

  public openDetailHistory(event) {
    this.showHistoryDetail = true;
    this.selectedMotorist = event;
    this._router.navigateByUrl(`motorist/history/${this.selectedMotorist.id}`);
  }

  public closeDetail = () => this.showHistoryDetail = false;

  public getMoreMotorists = () => (this.pageQuantity = this.pageQuantity + 6);

  private getMotorist = id => motorists.filter(m => m.id === id)[0];

  private plotRoute = id => {
    this.map.clearAll();
    this.selectedMotorist = this.getMotorist(id);
    if (this.selectedMotorist === undefined) return;

    if (
      this.selectedMotorist.history !== null &&
      this.selectedMotorist.history.length > 1
    ) {
      this.selectedMotorist.history.map(this.addPoint);
      this.directionService
        .getCoordinates(this.getLocations())
        .subscribe(
          success => this.onSuccessRoute(success),
          error => console.log(error)
        );
    }
  };

  private onSuccessRoute = data =>
    this.map.drawPolyline(
      data.routes[0].geometry.coordinates.map(geo => L.latLng(geo[1], geo[0]))
    );

  private addPoint = place =>
    this.map.addCircle(L.latLng(place.latitude, place.longitude));

  private getLocations = () =>
    this.selectedMotorist.history.map(obj =>
      Object.assign({
        lat: obj.latitude,
        lng: obj.longitude
      })
    );

  private setupMap(): void {
    this.map.createMapBoxMapInstance(false);
    this.moveMap(
      environment.mapbox.location.latitude,
      environment.mapbox.location.longitude
    );
  }

  private moveMap(lat: number, lng: number, zoom = 7) {
    this.map.setCenter(lat, lng);
    this.map.setZoom(zoom);
  }
}
