import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DeviceService } from '../device.service';

import { Observable } from '../../../../node_modules/rxjs';
import { of } from '../../../../node_modules/rxjs';
import { concatMap} from '../../../../node_modules/rxjs/operators';

class RegisterForm {
  id: string;
  name?: any;
  model?: any;
  technology?: any;
  updated: string;
  location: string;
  speed: string;
  batterylevel: string;
  subscribers: Array<Subscriber>;
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
     if(this.formDevice,valid) {
       
       const device$ = this.create(this.formDevice);
       const request$ = device$.pipe(
             concatMap((device : any) => (device.value) ? this.updateDevice(device.value) : of(device)));
       request$.subscribe(device => this.onRegister(device) , error =>this.onError(error));
     }
  }





  onCancel() {
    this.onFinish.emit();
  }
}
