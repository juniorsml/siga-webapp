import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sga-register-group',
  templateUrl: './register-group.component.html',
  styleUrls: ['./register-group.component.scss']
})
export class RegisterGroupComponent {
  @Input() public group: any;

  @Output() public onBackButton = new EventEmitter<void>();
  @Output() public onPlaceSelected = new EventEmitter<any>();

  public backButton() {
    this.onBackButton.emit();
  }

  public onSelected(event) {
    this.onPlaceSelected.emit({
      location: {
        latitude: event.latitude,
        longitude: event.longitude
      }
    });
  }
}
