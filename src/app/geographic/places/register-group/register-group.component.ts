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
  @Output() public onRegisterNewItem = new EventEmitter<any>();

  public showRegister: boolean;

  public backButton() {
    if (this.showRegister) {
      this.showRegister = false;
    }
    else {
      this.onBackButton.emit();
    }
  }

  public onSelected(event) {
    if (event.latitude && event.longitude) {
      this.onPlaceSelected.emit({
        location: {
          latitude: event.latitude,
          longitude: event.longitude
        }
      });
    } else {
      this.onPlaceSelected.emit({
        location: {
          latitude: event.lat(),
          longitude: event.lng()
        }
      });
    }
  }

  public registerNewItem(item) {
    this.showRegister = false;
    this.onRegisterNewItem.emit({ groupName: this.group.name, item });
  }

  public showCreateNew() {
    this.showRegister = true;
  }
}
