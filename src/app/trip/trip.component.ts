import { Component } from '@angular/core';
import { StepClickEvent } from '../shared/events/StepClickEvent';
import { Router } from '@angular/router';

@Component({
  selector: 'sga-trip',
  templateUrl: './trip.component.html'
})
export class TripComponent {
  constructor(private router: Router) { }
  
  onSelectStep(event: StepClickEvent) {
    switch (event.data.header) {
      case 'Geral': 
        this.router.navigateByUrl('trip/detail');
        break;
        
      case 'Itinerário':
        this.router.navigateByUrl('trip/places');
        break;
      
      case 'Motorista':
        this.router.navigateByUrl('trip/motorist');
        break;

      case 'Viagem':
        break; 
    }
  }
}
