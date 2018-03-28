import { Component, Input } from '@angular/core';

@Component({
  selector: 'sga-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  @Input('width')
  width: any;
}
