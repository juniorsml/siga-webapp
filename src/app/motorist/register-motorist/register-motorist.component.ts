import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sga-register-motorist',
  templateUrl: './register-motorist.component.html',
  styleUrls: ['./register-motorist.component.scss']
})
export class RegisterMotoristComponent {
  private place: any;

  @Input('showForm')
  public showForm: boolean;

  @Output('onFormClose')
  public onFormClose = new EventEmitter();

  constructor() {}

  placesFiltered(place: any) {
    this.place = place;
  }

  filterRemoved() {
    this.place = null;
  }
  
  cancel() {
    this.onFormClose.emit();
  }

  create(formMotorist: NgForm) {
    const motorist = {
      location: this.place.formatted_address,
      ...formMotorist.value
    };

    console.log(motorist);
  }
}
