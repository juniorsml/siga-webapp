import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'sga-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog-component.scss']
})
export class ProfileDialogComponent {
  @Input() showDialog: boolean;
  @Input() selectedMotorist: any;
  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.showDialog = false;
    this.onDialogClose.emit();
  }
}
