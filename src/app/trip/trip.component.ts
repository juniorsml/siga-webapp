import { Component } from '@angular/core';
import { StepClickEvent } from '../shared/events/StepClickEvent';

@Component({
  selector: 'sga-trip',
  templateUrl: './trip.component.html'
})
export class TripComponent {
  onSelectStep(event: StepClickEvent) {
    switch (event.data.header) {
      case 'Geral': 
        break;
      case 'Viagem':
        break; 
    }
  }
}
