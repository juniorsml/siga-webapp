import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'sga-send-command',
  templateUrl: './send-command.component.html',
  styleUrls: ['./send-command.component.scss']
})
export class SendCommandModalComponent {
  @Input() showModal: boolean;

  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();

  cancel() {
    this.showModal = false;
    this.onDialogClose.emit();
  }
}
