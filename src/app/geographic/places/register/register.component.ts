import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'sga-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Input()
  public backParam: string;
  
  @Output()
  public onBackButton = new EventEmitter<string>();
  
  @Output()
  public onPlaceSelected = new EventEmitter();
  
  public placeSelected = false;

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
}
