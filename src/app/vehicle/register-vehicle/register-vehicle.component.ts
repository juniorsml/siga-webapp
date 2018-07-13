import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VehicleService } from '../vehicle.service';

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
  styleUrls: ['./register-vehicle.component.scss'],
  providers: [VehicleService]
})

export class RegisterVehicleComponent {

  model: RegisterForm = new RegisterForm();
  anttDueDate: Date;
  comunication: string;
  private place: any;
  public mapUrl: SafeResourceUrl;

  @Input()
  public showForm: boolean;
  @Output() onFinish: EventEmitter<void> = new EventEmitter();
  @Output() onSave = new EventEmitter();
  public selectedTabIndex = 0;

  constructor(
    private domSanitizer: DomSanitizer,
    private vehicleService: VehicleService
    ) {
    this.mapUrl = domSanitizer.bypassSecurityTrustResourceUrl(this.getMapUrlByLatLng(-23.53, -46.62));
  }

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

  onSubmit(form: NgForm) {
      if (form.valid) {
        this.create(form);
        console.log('Form Submitted!');
        form.reset();
      }
    }

  cancel() {
    this.onFinish.emit();
  }

  create(formMotorist: NgForm) {
    const vehicle = {
      // location: this.place.formatted_address,
      ...formMotorist.value,
      ...this.model
    };

    this
      .vehicleService
      .saveVehicle(vehicle)
      .subscribe(
        success => this.onSuccess(success),
        error => this.onError(error));

    console.log(vehicle);
  }

  onSuccess(data) {
    console.log(data);
    this.onSave.emit();
    this.onFinish.emit();
  }

  onError(error) {
    console.error(error);
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
