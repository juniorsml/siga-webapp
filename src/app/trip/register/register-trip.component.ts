import { Component } from '@angular/core';
import { StepClickEvent } from '../../shared/events/StepClickEvent';
import { Router } from '@angular/router';

@Component({
  selector: 'sga-register-trip',
  templateUrl: './register-trip.component.html',
  styleUrls: ['./register-trip.component.scss']
})
export class RegisterTripComponent {
  constructor(private router: Router) { }
 
  onSelectStep(event: StepClickEvent) {
    switch (event.data.header) {
      
      case 'Geral': 
        this.router.navigateByUrl('trip/register/detail');
        break;
        
      case 'Itinerário':
        this.router.navigateByUrl('trip/register/places');
        break;
      
      case 'Motorista':
        this.router.navigateByUrl('trip/register/motorist');
        break;

      case 'Veículos':
        this.router.navigateByUrl('trip/register/vehicles');
        break;
      case 'Reboque':
        this.router.navigateByUrl('trip/register/trucks');
        break;

      case 'Dispositivo':
        this.router.navigateByUrl('trip/register/device');
        break;

      

      case 'Viagem':
        break; 
    }
  }
}
