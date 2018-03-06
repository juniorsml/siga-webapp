import { Component } from '@angular/core';

@Component({
  selector: 'sga-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent {
  
  text: any;

  onPlacesFiltered(event) {
    console.log(event);
  }

  onPlacesFilterRemoved(event) {
    console.log(event);
  }
}