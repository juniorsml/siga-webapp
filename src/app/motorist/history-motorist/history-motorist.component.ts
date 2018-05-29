import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Map } from '../../shared/models/Map';
import { ActivatedRoute } from '@angular/router';
import { motorists } from '../../shared/mocks/motorist';

@Component({
  selector: 'sga-history-motorist',
  templateUrl: './history-motorist.component.html',
  styleUrls: ['./history-motorist.component.scss']
})
export class HistoryMotoristComponent implements OnInit {

  public motorist: any;

  constructor(private map: Map, 
              private router: ActivatedRoute) {}

  ngOnInit() {
    this.setupMap();
    this.router.params.subscribe(data => this.motorist = this.getMotorist(data.id));
  }

  private getMotorist = id => motorists.filter(m => m.id === id)[0];

  private setupMap(): void {
    this.map.createMapBoxMapInstance(false);
    this.moveMap(
      environment.mapbox.location.latitude,
      environment.mapbox.location.longitude
    );
  }

  private moveMap(lat: number, lng: number, zoom = 7) {
    this.map.setZoom(zoom);
    this.map.setCenter(lat, lng);
  }
}
