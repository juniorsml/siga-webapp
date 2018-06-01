import { Component, OnInit,EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Map } from '../../../shared/models/Map';
import { motorists } from '../../../shared/mocks/motorist';
import { environment } from '../../../../environments/environment';
import { DirectionService } from '../../../shared/services/direction.service';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';

@Component({
  selector: 'sga-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {
  @Input() showHistoryDetail:boolean;
  public motorist: any;

   @Input() showHistoryDetail:boolean;

  constructor(
    private map: Map,
    private router: ActivatedRoute,
    private directionService: DirectionService
  ) {}
  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;
  ngOnInit() {
   
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


  }


  private getMotorist = id => motorists.filter(m => m.id === id)[0];

  private plotRoute = id => {
    this.motorist = this.getMotorist(id);
    if (this.motorist.history !== null && this.motorist.history.length > 1) {
      this.directionService
        .getCoordinates(this.getLocations())
        .subscribe(
          success => this.onSuccessRoute(success),
          error => console.log(error)
        );
    }
  };

  private onSuccessRoute = data => {
    this.map.addLayer(data.routes[0].geometry, true);
    const { latitude, longitude } = this.motorist.history[0];

    this.moveMap(latitude, longitude, 14);
  };

  private getLocations = () =>
    this.motorist.history.map(obj =>
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
