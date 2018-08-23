import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'sga-add-rules-dialog',
  templateUrl: './add-rules-dialog.component.html',
  styleUrls: ['./add-rules-dialog.component.scss']
})
export class AddRulesDialogComponent {
 
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
