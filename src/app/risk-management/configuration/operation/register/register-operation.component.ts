import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sga-register-operation',
  templateUrl: './register-operation.component.html',
  styleUrls: ['./register-operation.component.scss']
})
export class RegisterOperationComponent {
  @Output()
  public onFinish = new EventEmitter();

  public onSubmit(formOperation: NgForm) {
    const {} = formOperation.value;
    this.onFinish.emit();
  }

  onCancel() {
    this.onFinish.emit();
  }
}
