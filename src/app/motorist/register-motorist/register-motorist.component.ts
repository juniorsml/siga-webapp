import { Component, Output, OnInit, EventEmitter, Input, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';



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
  landlinePhone: string;
  mobilePhone: string;
  messagePhone: string;

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
  styleUrls: ['./register-motorist.component.scss']
})

export class RegisterMotoristComponent implements  OnInit {

  model: RegisterForm = new RegisterForm();
  @ViewChild('formMotorist') formMotorist: any;

  private place: any;

  @Input('showForm')
  public showForm: boolean;

  pt: any;
  landlinephone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  mobilephone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  messagephone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  public selectedTabIndex = 0;

  // Slim Scroll options
  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

  ngOnInit() {
    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      alwaysVisible: true
    };
    this.pt = {
        firstDayOfWeek: 1,
        dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
        dayNamesShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb' ],
        dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
        monthNames:
        [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro' ],
        monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
        today: 'Hoje',
        clear: 'Limpar'
    };

  }

  onSubmit() {
      if (this.formMotorist.valid) {
        console.log('Form Submitted!');
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
     let containerImage = document.querySelector('.img-profile');
     let removeImage = document.querySelector('.remove-img-profile');
     (containerImage as HTMLElement).style.backgroundImage  = 'url(\' \')';
     (containerImage as HTMLElement).style.display = 'none';
     (removeImage as HTMLElement).style.display = 'none';

  }

 

  @Output('onFormClose')
  public onFormClose = new EventEmitter();
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

  public mapUrl: SafeResourceUrl;

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
