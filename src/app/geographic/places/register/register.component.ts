import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'sga-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Input() public backParam: string;
  
  @Output() public onSubmitForm = new EventEmitter<any>();
  @Output() public onBackButton = new EventEmitter<string>();
  @Output() public onPlaceSelected = new EventEmitter<any>();
  
  public placeSelected = false;

  public docType = 0;

  public backButton() {
    this.onBackButton.emit(this.backParam);
  }

  public onPlacesFiltered(event) {
    this.placeSelected = true;
    const { location } = event.geometry;
    if (location === undefined) return;

    this.onPlaceSelected.emit(location);
  }
  
  public onPlacesFilterRemoved() {
    this.placeSelected = false;
  }

  public isValidForm(form) {
    return form.valid && this.docType !== 0;
  }

  public onSubmit(form) {
    const { value } = form;
    this.onSubmitForm.emit(value);
  }
}
