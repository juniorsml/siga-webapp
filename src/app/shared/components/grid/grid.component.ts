import { Component } from '@angular/core';

@Component({
  selector: 'sga-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent {
  text: any;
  motorist: any;
  filterLocation: any;
  filterDistance: any;
  selectedMotorist: any;
  contextMenuSelected: any;

  placesFilter = [];
  motorists: any;

  onPlacesFiltered(event) {
    console.log(event);
  }

  onPlacesFilterRemoved(event) {
    console.log(event);
  }

  onCellClick(event) {
    console.log(event);
  }

  onCellRightClick(event) {
    console.log(event);
  }
}
