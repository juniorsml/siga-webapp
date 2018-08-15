import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'sga-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
 
  @Input() showModal: boolean;
  @Input() type: string;
  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();

  cancel() {
    this.showModal = false;
    this.onDialogClose.emit();
  }

  confirm() {
    this.showModal = false;
    this.onConfirm.emit();
  }
}
