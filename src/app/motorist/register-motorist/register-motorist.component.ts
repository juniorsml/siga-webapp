import { Component, Output, OnInit, EventEmitter, Input, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MotoristService } from '../motorist.service';

class RegisterForm {

  // Personal Info
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  motherName: string;
  document: string;
  documentId: string;
  maritalStatus: string;
  wifeName: string;
  haveChildren: string;
  howManyChildren: number;
  educationalLevel: string;
  cnhNumber: string;
  cnhCategory: string;
  dueDate: string;

  // Address
  cellPhone: string;
  messagePhone: string;
  landlinePhone: string;

  nextelPhone: string;

  // Profile
  bond: string;
  dueDateMopp: Date;
  dueDateAso: Date;
  dueDateCdd: Date;
}

@Component({
  selector: 'sga-register-motorist',
  templateUrl: './register-motorist.component.html',
  styleUrls: ['./register-motorist.component.scss'],
  providers: [MotoristService]
})

export class RegisterMotoristComponent implements  OnInit {

  model: RegisterForm = new RegisterForm();
  @ViewChild('formMotorist') formMotorist: any;

  private place: any;
  public mapUrl: SafeResourceUrl;

  @Input()
  public showForm: boolean;
  @Output() onFormClose: EventEmitter<any> = new EventEmitter();

  pt: any;
  landlinephone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cellPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  messagephone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  public selectedTabIndex = 0;

  constructor(private domSanitizer: DomSanitizer,
              private motoristService: MotoristService) {
    this.mapUrl = domSanitizer.bypassSecurityTrustResourceUrl(this.getMapUrlByLatLng(-23.53, -46.62));
  }

  ngOnInit() { }

  onSubmit() {
      if (this.formMotorist.valid) {
        this.create(this.formMotorist);
        this.formMotorist.reset();
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
        (containerImage as HTMLElement).style.backgroundImage  = 'url(' + url + ')';
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }
  removeProfilePhoto() {
     const containerImage = document.querySelector('.img-profile');
     const removeImage = document.querySelector('.remove-img-profile');
     (containerImage as HTMLElement).style.backgroundImage  = 'url(\' \')';
     (containerImage as HTMLElement).style.display = 'none';
     (removeImage as HTMLElement).style.display = 'none';

  }
    cancel() {
    this.onFormClose.emit();
  }

  create(formMotorist: NgForm) {
    const motorist = {
      // location: this.place.formatted_address,
      ...formMotorist.value,
      enabled: true
    };

    this
      .motoristService
      .saveMotorist(motorist)
      .subscribe(
        success => this.onSuccessCreate(success),
        error => this.onError(error));
  }

  onSuccessCreate = success => {
    console.log(success);
    this.onFormClose.emit();
  }

  onError = error => console.log(error);

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
