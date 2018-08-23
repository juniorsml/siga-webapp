import { Component, EventEmitter, Output, Input } from '@angular/core';
// import { DeviceService } from '../device.service';
// import { Observable } from '../../../../node_modules/rxjs';


@Component({
  selector: 'sga-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog-component.scss']
})
export class DeviceDialogComponent {
  @Input() showDialog: boolean;
  @Input() selectedDevice: any;
  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();

  // constructor( private deviceService: DeviceService)  {}


  onClose() {
    this.showDialog = false;
    this.onDialogClose.emit();
  }

  // public getDevice(deviceId: string): Observable<any> {
  //     return this.deviceService.getDevice(deviceId);
  // }


}
