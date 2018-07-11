import { Component, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

class RegisterForm {
  // Vehicle Info
  vehiclePlate: string;
  renavan: string;
  brand: string;
  model: string;
  color: string;
  year: string;
  type: string;
  capacity: string;
  fleetNumber: string;
  anttNumber: number;
  anttDueDate: Date;
  cnhNumber: string;

  // Owner
  ownerName: string;
  ownerDocument: string;

  // Devices

  number: string;
  tech: string;
  comunication: string;
}

@Component({
  selector: 'sga-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.scss']
})

export class RegisterVehicleComponent {

  model: RegisterForm = new RegisterForm();
  @ViewChild('formVehicle') formVehicle: any;
  anttDueDate: Date;
  comunication: string;
  private place: any;
  public mapUrl: SafeResourceUrl;

  @Input()
  public showForm: boolean;
  @Output() onFormClose: EventEmitter<void> = new EventEmitter();
  public selectedTabIndex = 0;

  // Show image profile
  addProfilePhoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (element: any) => {
        const url = element.target.result;
        const removeImage = document.querySelector('.remove-img-profile');
        const containerImage = document.querySelector('.img-profile');
        (removeImage as HTMLElement).style.display = 'flex';
        (containerImage as HTMLElement).style.display = 'block';
        (containerImage as HTMLElement).style.backgroundImage = 'url( ' + url + ' )';
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  removeProfilePhoto() {
     const containerImage = document.querySelector('.img-profile');
     const removeImage = document.querySelector('.remove-img-profile');
     (containerImage as HTMLElement).style.backgroundImage  = 'url()';
     (containerImage as HTMLElement).style.display = 'none';
     (removeImage as HTMLElement).style.display = 'none';
   }

  onSubmit() {
      if (this.formVehicle.valid) {
        console.log('Form Submitted!');
        this.formVehicle.reset();
      }
    }

  cancel() {
    this.onFormClose.emit();
  }

  create(formMotorist: NgForm) {
    const vehicle = {
      location: this.place.formatted_address,
      ...formMotorist.value
    };
    console.log(vehicle);
  }
  constructor(private domSanitizer: DomSanitizer) {
    this.mapUrl = domSanitizer.bypassSecurityTrustResourceUrl(this.getMapUrlByLatLng(-23.53, -46.62));
  }

  placesFiltered(place: any) {
    const urlValue = this.getMapUrlByLatLng(place.geometry.location.lat(), place.geometry.location.lng());
    this.mapUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(urlValue);
    this.place = place;
  }

  filterRemoved() {
    this.place = null;
  }
  getMapUrlByLatLng(lat: number, lng: number) {
    return `https://maps.google.com/maps?q=${lat},${lng}&hl=es;z=14&amp&output=embed`;
  }
}
