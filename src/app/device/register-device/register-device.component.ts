import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';

import { DeviceService } from '../device.service';

@Component({
  selector: 'sga-register-device',
  templateUrl: './register-device.component.html',
  styleUrls: ['./register-device.component.scss'],
  providers: [DeviceService]
})
export class RegisterDeviceComponent {
  @Output()
  public onFinish = new EventEmitter();

  @Input('showForm')
  public showForm: boolean;

  @ViewChild('formDevice') formDevice: any;

  device; 

  constructor(private deviceService: DeviceService) { }

  // public onSubmit() {
    
  //    if ( this.formDevice.valid ) {
       
  //      this.create(this.formDevice)
  //               .subscribe(device => this.onRegister(device) , error => this.onError(error));
  //    }
  // }

  public onSubmit() {
      const device = this.formDevice.value;
      this
        .deviceService
        .saveDevice(device)
        .subscribe(
          success => this.onSaveSuccess(success),
          error => this.onError(error)
        );
  }
  public onSaveSuccess(device) {
    this.formDevice.reset();
    this.onFinish.emit(device);
  }
  public updateDevice(device) {
     return this.deviceService.updateDevice(device);
  }

  public onError = error => console.log(error);

  onCancel() {
    this.onFinish.emit();
    this.formDevice.reset();
  }
}
