import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { StepClickEvent } from '../../shared/events/StepClickEvent';
import { Router } from '@angular/router';

@Component({
  selector: 'sga-summary-dialog',
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.scss']
})

export class SummaryDialogComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() showDialog: boolean;
  @Input() selectedMotorist: any;
  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.showDialog = false;
    this.onDialogClose.emit();
  }
   ngOnInit() {
  }
  onSelectStep(event: StepClickEvent) {
    switch (event.data.header) {
      
      case 'Geral': 
        this.router.navigateByUrl('trip/summary/detail');
        break;
        
      case 'Motorista':
        this.router.navigateByUrl('trip/summary/motorist');
        break;
      
      
    }
  }


}

 