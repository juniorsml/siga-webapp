import { Component } from '@angular/core';
import { StepClickEvent } from '../../shared/events/StepClickEvent';
import { Router } from '@angular/router';
import { RegisterStepEnum } from './RegisterStepEnum';

@Component({
  selector: 'sga-register-trip',
  templateUrl: './register-trip.component.html',
  styleUrls: ['./register-trip.component.scss']
})
export class RegisterTripComponent {
  constructor(private router: Router) { }

  private _currentStep = 0;
  public get currentStep(): RegisterStepEnum {
    return this._currentStep;
  }
  public set currentStep(value: RegisterStepEnum) {
    if (value >= 0 && value <= 6) {
      this._currentStep = value;
    }
  }

  public next = () => this.navigateByStep(this.currentStep + 1);

  public prev = () => this.navigateByStep(this.currentStep - 1);

  public onSelectStep = (event: StepClickEvent) => this.navigateByStep(event.index);

  private navigateByStep(step: RegisterStepEnum) {
    this.currentStep = step;

    switch (step) {

      case RegisterStepEnum.General:
        this.router.navigateByUrl('trip/register/detail');
        break;

      case RegisterStepEnum.Itinerary:
        this.router.navigateByUrl('trip/register/places');
        break;

      case RegisterStepEnum.Motorist:
        this.router.navigateByUrl('trip/register/motorist');
        break;

      case RegisterStepEnum.Vehicle:
        this.router.navigateByUrl('trip/register/vehicles');
        break;
      case RegisterStepEnum.Truck:
        this.router.navigateByUrl('trip/register/trucks');
        break;

      case RegisterStepEnum.Device:
        this.router.navigateByUrl('trip/register/device');
        break;

      case RegisterStepEnum.Summary:
        this.router.navigateByUrl('trip/register/summary');
        break;
    }
  }
}
