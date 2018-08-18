import { Component, Output, EventEmitter,Input } from '@angular/core';
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
  @ViewChild('formDevice') formMotorist: any;

  public onSubmit(deviceForm: NgForm) {
    const {} = deviceForm.value;
    this.onFinish.emit();
  }





  onCancel() {
    this.onFinish.emit();
  }
}
