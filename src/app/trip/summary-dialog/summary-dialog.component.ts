import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sga-summary-dialog',
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.scss']
})

export class SummaryDialogComponent implements OnInit {

  @Input() showDialog: boolean;
  @Input() selectedMotorist: any;
  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.showDialog = false;
    this.onDialogClose.emit();
  }
   ngOnInit() {
  }


}

 