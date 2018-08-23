import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DeviceService } from '../device.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concatMap } from 'rxjs/operators';

class RegisterForm {
  id: string;
  name?: any;
  model?: any;
  technology?: any;
  updated: string;
  location: string;
  speed: string;
  batterylevel: string;
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
       const device$ = this.create(this.formDevice);
       const request$ = device$.pipe(
             concatMap((device : any) => (device.value) ? this.updateDevice(device.value) : of(device)));
       request$.subscribe(device => this.onRegister(device) , error =>this.onError(error));
     }
  }

  public onRegister(device) {
    this.formDevice.reset();
    this.onFinish.emit(device);
  }

  create(formDevice: NgForm): Observable<any> {
    const device = this.buildDevice(formDevice);
    return this .deviceService.saveDevice(device);
  }

  public updateDevice(device) {
     return this.deviceService.updateDevice(device);
  }

  public buildDevice(formDevice: NgForm) {
    debugger 
    const device = formDevice.value;
    return device;
  }

  onError=error=>console.log(error);

  onCancel() {
    this.onFinish.emit();
    this.formDevice.reset();
  }
}
