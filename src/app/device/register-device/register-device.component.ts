import { Component, Output, EventEmitter,Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sga-register-device',
  templateUrl: './register-device.component.html',
  styleUrls: ['./register-device.component.scss']
})
export class RegisterDeviceComponent {
  @Output()
  public onFinish = new EventEmitter();

  @Input('showForm')
  public showForm: boolean;

  public onSubmit(deviceForm: NgForm) {
    const {} = deviceForm.value;
    this.onFinish.emit();
  }

  onCancel() {
    this.onFinish.emit();
  }
}
