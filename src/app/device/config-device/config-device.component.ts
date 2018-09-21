import { Component } from '@angular/core';
import { Device } from '../../shared/models/api/Device';

@Component({
  selector: 'sga-config-device',
  templateUrl: './config-device.component.html',
  styleUrls: ['./config-device.component.scss']
})
export class ConfigDeviceComponent {
  public devices: Array<Device>;
  public showFormRegister = false;

  constructor() {}

  public reloadDevices: boolean;

  openFormRegister() {
    this.showFormRegister = !this.showFormRegister;
  }

  closeFormRegister(device) {
    if ( device ) {
      this.reloadDevices = true;
    }
    this.showFormRegister = false;
  }
}
