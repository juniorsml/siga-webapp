import { Component, Output,OnInit, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';

@Component({
  selector: 'sga-register-motorist',
  templateUrl: './register-motorist.component.html',
  styleUrls: ['./register-motorist.component.scss']
})

export class RegisterMotoristComponent implements  OnInit {

  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

  ngOnInit() {
    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      alwaysVisible: true
    }
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
