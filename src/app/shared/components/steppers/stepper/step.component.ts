import { Component, Input } from '@angular/core';
import { StepsComponent } from '../steps.component';

@Component({
  selector: 'sga-step',
  template: ``
})
export class StepComponent {
  @Input() public header: string;

  @Input() public icon: string;

  @Input() public hasGap: boolean;

  @Input() public isHollow: boolean;

  constructor(public stepsComponent: StepsComponent) {
    stepsComponent.addStep(this);
  }
}
