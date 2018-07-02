import { Component, Output, OnInit, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

class RegisterForm {

}


@Component({
  selector: 'sga-register-truck',
  templateUrl: './register-truck.component.html',
  styleUrls: ['../../vehicle/register-vehicle/register-vehicle.component.scss']
})

export class RegisterTruckComponent implements  OnInit {

  model: RegisterForm = new RegisterForm();
  @ViewChild('formTruck') formTruck: any;
  anttDueDate: Date;
  comunication: string;
  pt:any;
  private place: any;
  public mapUrl: SafeResourceUrl;


  @Input()
  public showForm: boolean;
  @Output() onFormClose: EventEmitter<void> = new EventEmitter();
  public selectedTabIndex = 0;

  ngOnInit() { }

  onSubmit() {
      if (this.formTruck.valid) {
        console.log('Form Submitted!');
        this.formTruck.reset();
      }
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
        (containerImage as HTMLElement).style.backgroundImage  = 'url( ' + url + ' )';
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

  cancel() {
    this.onFormClose.emit();
  }

  create(formTruck: NgForm) {
    const truck = {
      location: this.place.formatted_address,
      ...formTruck.value
    };

    console.log(truck);
  }

  getMapUrlByLatLng(lat: number, lng: number) {
    return `https://maps.google.com/maps?q=${lat},${lng}&hl=es;z=14&amp&output=embed`;
  }


}
