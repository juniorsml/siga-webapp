import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sga-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output()
  public onBackButton = new EventEmitter();
  
  @Output()
  public onPlaceSelected = new EventEmitter();
  
  public placeSelected = false;

  public backButton() {
    this.onBackButton.emit();
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
}
