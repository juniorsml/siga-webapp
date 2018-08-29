import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DeviceService } from '../device.service';

import { Observable } from 'rxjs/Observable';

class RegisterForm {
  id:any;
  definition: any;
  obs: string;
  rules?: any;
}


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


  model: RegisterForm = new RegisterForm();
  @ViewChild('formDevice') formDevice: any;

  device;

  constructor(private deviceService: DeviceService) { }



  public onSubmit() {
     if ( this.formDevice.valid ) {
       this.create(this.formDevice)
                .subscribe(device => this.onRegister(device) , error => this.onError(error));
     }
  }

  public onRegister(device) {
    debugger;
    this.formDevice.reset();
    this.onFinish.emit(device);
  }

  create(formDevice: NgForm): Observable<any> {
    const device = this.buildDevice(formDevice);
    debugger;
    return this .deviceService.saveDevice(device);
  }

  public updateDevice(device) {
     return this.deviceService.updateDevice(device);
  }

  public buildDevice(formDevice: NgForm) {
    const device = formDevice.value;
    return device;
  }

  onError=error=>console.log(error);

  onCancel() {
    this.onFinish.emit();
    this.formDevice.reset();
  }
}
