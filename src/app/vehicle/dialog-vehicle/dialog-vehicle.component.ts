import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'sga-dialog-vehicle',
  templateUrl: './dialog-vehicle.component.html',
  styleUrls: ['./dialog-vehicle.component.scss']
})
export class DialogVehicleComponent {
  @Input() showDialog: boolean;
  @Input() selectedVehicle: any;
  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.showDialog = false;
    this.onDialogClose.emit();
  }
}
