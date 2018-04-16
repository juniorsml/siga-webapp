import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sga-register-device',
  templateUrl: './register-device.component.html',
  styleUrls: ['./register-device.component.scss']
})
export class RegisterDeviceComponent {

  public onSubmit(deviceForm: NgForm) {
    const {} = deviceForm.value;
  }
}
