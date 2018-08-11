import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StepClickEvent } from '../../events/StepClickEvent';

@Component({
  selector: 'sga-summary-dialog',
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.scss']
})

export class SummaryDialogComponent implements OnChanges {

  @Input() public trip: any;
  
  @Input() public showDialog = false;
  
  @Input() public stepIndex: number;
  
  @Output() public onDialogClose = new EventEmitter();
  
  private wasClicked = false;
  
  public selectedStepIndex: number;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stepIndex && !changes.firstChange) {
      this.selectedStepIndex = changes.stepIndex.currentValue;
    }
  }

  public onClose() {
    this.onDialogClose.emit();
  }

  public onSelectStep(event: StepClickEvent) {
    this.selectedStepIndex = event.index;
    this.wasClicked= !this.wasClicked;
  }
}
 