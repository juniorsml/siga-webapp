import { Component, OnInit } from '@angular/core';
import { areas } from '../../../shared/mocks/area';

@Component({
  selector: 'sga-grid-area',
  templateUrl: './grid-area.component.html',
  styleUrls: ['./grid-area.component.scss']
})
export class GridAreaComponent implements OnInit {

  public filterDistance: any;
  public filterLocation: any;
  public text: any;

  public data = new Array<any>();

  public onPlacesFiltered(event) {
    this.filterDistance = event.distance;
    this.filterLocation = { lat: event.lat, lng: event.lng };
  }

  public onPlacesFilterRemoved() {
    this.filterDistance = null;
    this.filterLocation = null;
  }

  public onCellClick(event) {
    event
  }

  public onCellRightClick(event) {
    event
  }

  ngOnInit(): void {
    this.data = areas;
  }
}
