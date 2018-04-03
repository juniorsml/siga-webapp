import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StepComponent } from './stepper/step.component';
import { StepClickEvent } from '../../events/StepClickEvent';

@Component({
  selector: 'sga-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent {
  @Input() 
  public width: string;

  @Output()
  public onSelectStep = new EventEmitter<StepClickEvent>();

  public steps = new Array<StepComponent>();

  public addStep(step: StepComponent): void {
    if (step) this.steps.push(step);
  }

  public onClick(event: Event, step: StepComponent): void {
    this.onSelectStep.emit(new StepClickEvent(event, step));
  }
}
