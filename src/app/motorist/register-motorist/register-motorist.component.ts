import { Component, Output,OnInit, EventEmitter, Input,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';


class RegisterForm {
  
}


@Component({
  selector: 'sga-register-motorist',
  templateUrl: './register-motorist.component.html',
  styleUrls: ['./register-motorist.component.scss']
})

export class RegisterMotoristComponent implements  OnInit {

  
  model: RegisterForm = new RegisterForm();
  @ViewChild('formMotorist') formMotorist: any;
  
  //Slim Scroll options
  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

  ngOnInit() {
    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      alwaysVisible: true
    }
  }

  onSubmit() {
      if (this.formMotorist.valid) {
        console.log("Form Submitted!");
        this.formMotorist.reset();
      }
    }

  // Show image profile
  addProfilePhoto(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
        var url = event.target.result;
        var removeImage = document.querySelector('.remove-img-profile');
        var containerImage = document.querySelector('.img-profile');
        (removeImage as HTMLElement).style.display = 'flex';
        (containerImage as HTMLElement).style.display = 'block';
        (containerImage as HTMLElement).style.backgroundImage  = "url("+url+")";
      }
      reader.readAsDataURL(event.target.files[0]);

    }
  }
  removeProfilePhoto(){
     var containerImage = document.querySelector('.img-profile');
     var removeImage = document.querySelector('.remove-img-profile');
     (containerImage as HTMLElement).style.backgroundImage  = "url(' ')";
     (containerImage as HTMLElement).style.display = 'none';
     (removeImage as HTMLElement).style.display = 'none';

  }

  private place: any;

  @Input('showForm')
  public showForm: boolean;

  @Output('onFormClose')
  public onFormClose = new EventEmitter();

  public mapUrl: SafeResourceUrl;

  constructor(private domSanitizer : DomSanitizer) {
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

  create(formMotorist: NgForm) {
    const motorist = {
      location: this.place.formatted_address,
      ...formMotorist.value
    };

    console.log(motorist);
  }

  getMapUrlByLatLng(lat: number, lng: number) {
    return `https://maps.google.com/maps?q=${lat},${lng}&hl=es;z=14&amp&output=embed`;
  }


}
