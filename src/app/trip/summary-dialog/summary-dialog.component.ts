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

  public onClose() {
    this.onDialogClose.emit();
  }

  public onSelectStep(event: StepClickEvent) {
    switch (event.data.header) {
      
      case 'Geral': 
        this.router.navigateByUrl('trip/started/detail');
        break;
        
      case 'Motorista':
        this.router.navigateByUrl('trip/started/motorist');
        break;
    }
  }
}
 