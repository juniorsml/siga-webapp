import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'sga-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageModalComponent {
  public kindOfMessage:any;
  @Input() showModal: boolean;

  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();

  cancel() {
    this.showModal = false;
    this.onDialogClose.emit();
  }
}
