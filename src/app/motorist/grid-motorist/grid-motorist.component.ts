import { Component, Input } from '@angular/core';

@Component({
  selector: 'sga-grid-motorist',
  templateUrl: './grid-motorist.component.html',
  styleUrls: ['./grid-motorist.component.scss']
})
export class GridMotoristComponent {
  @Input() motorists = new Array();
  @Input() dataLoading: boolean = true;

  text: any;
  distance: any;
  motorist: any;
  placeText: any;
  styleClass: any;
  filterLocation: any;
  filterDistance: any;
  selectedMotorist: any;
  contextMenuSelected: any;

  public onCellClick(event) {
    event.target;
  }

  public onCellRightClick(event) {
    event.target;
  }

  public onPlacesFiltered(event) {
    event.target;
  }

  public onPlacesFilterRemoved(event) {
    event.target;
  }

  public onPlacesKeyUp() {
  }

  public onDistanceKeyUp() {
  }
}
