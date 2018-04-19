import { Component, OnInit } from '@angular/core';
import { areas } from '../../../shared/mocks/area';

@Component({
  selector: 'sga-grid-area',
  templateUrl: './grid-area.component.html',
  styleUrls: ['./grid-area.component.scss']
})
export class GridAreaComponent implements OnInit {

  public text: any;

  public data = new Array<any>();

  public onPlacesFiltered(event): void {
    event
  }

  public onPlacesFilterRemoved(): void {

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
