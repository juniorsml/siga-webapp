import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'sga-dialog-truck',
  templateUrl: './dialog-truck.component.html',
  styleUrls: ['../../vehicle/dialog-vehicle/dialog-vehicle.component.scss']
})
export class DialogTruckComponent {
  @Input() showDialog: boolean;
  @Input() selectedVehicle: any;
  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.showDialog = false;
    this.onDialogClose.emit();
  }
}
