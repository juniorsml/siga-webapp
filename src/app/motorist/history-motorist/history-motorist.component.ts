import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Map } from '../../shared/models/Map';
import { motorists } from '../../shared/mocks/motorist';
import { environment } from '../../../environments/environment';
import { DirectionService } from '../../shared/services/direction.service';

@Component({
  selector: 'sga-history-motorist',
  templateUrl: './history-motorist.component.html',
  styleUrls: ['./history-motorist.component.scss']
})
export class HistoryMotoristComponent implements OnInit {
  public motorist: any;
  public motoristsList = new Array();
  motoristsList = motorists;

  constructor(
    private map: Map,
    private router: ActivatedRoute,
    private directionService: DirectionService
  ) {}

  ngOnInit() {
    this.setupMap();
    this.router.params.subscribe(data => this.plotRoute(data.id));
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
