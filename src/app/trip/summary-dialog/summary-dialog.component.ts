import { Component, EventEmitter, Output, Input } from '@angular/core';
import { StepClickEvent } from '../../shared/events/StepClickEvent';
import { Router } from '@angular/router';

@Component({
  selector: 'sga-summary-dialog',
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.scss']
})

export class SummaryDialogComponent {

  constructor(private router: Router) { }

  @Input()
  public showDialog = false;

  @Output() 
  public onDialogClose = new EventEmitter();

  wasClicked = false;

  public onClose() {
    this.onDialogClose.emit();
  }

  public onSelectStep(event: StepClickEvent) {

    this.wasClicked= !this.wasClicked;

    console.log(this.wasClicked);
    
    switch (event.data.header) {
      
      case 'Resumo': 
        this.router.navigateByUrl('trip/started/summary');

        break;
        
      case 'Motorista':
        this.router.navigateByUrl('trip/started/motorist');
        break;
      case 'Veículo':
        this.router.navigateByUrl('trip/started/vehicle');
        break;
      case 'Itinerário':
        this.router.navigateByUrl('trip/started/itinerary');
        break;
    }
  }
}
 