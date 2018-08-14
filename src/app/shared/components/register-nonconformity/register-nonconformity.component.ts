import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'sga-register-nonconformity',
  templateUrl: './register-nonconformity.component.html',
  styleUrls: ['./register-nonconformity.component.scss']
})
export class RegisterNonConformityComponent {
 
  @Input() showModal: boolean;

  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();

  cancel() {
    this.showModal = false;
    this.onDialogClose.emit();
  }
}
