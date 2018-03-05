import { Component } from '@angular/core';

@Component({
  selector: 'sga-grid-motorist',
  templateUrl: './grid-motorist.component.html'
})
export class GridMotoristComponent {

  public onPlacesFiltered(event) {
    event.target;
  }

  public onPlacesFilterRemoved(event) {
    event.target;
  }
}
