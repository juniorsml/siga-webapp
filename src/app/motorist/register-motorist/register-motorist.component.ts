import { Component, Output, OnInit, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MotoristService } from '../motorist.service';
import { Map } from '../../shared/models/Map';

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

  ray: number;

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

export class RegisterMotoristComponent implements OnInit {

  model: RegisterForm = new RegisterForm();
  @Input() public showForm: boolean;
  @Output() onFormClose: EventEmitter<any> = new EventEmitter();
  @ViewChild('formMotorist') formMotorist: any;

  public selectedTabIndex = 0;
  public ray = 1000;

  private place: any;
  private location: any;

  pt: any;
  mobilephone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  messagephone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  landlinephone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  constructor(private map: Map,
              private motoristService: MotoristService) { }

  ngOnInit() {
    this.map.createMapBoxMapInstance();
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
        (containerImage as HTMLElement).style.backgroundImage = 'url(' + url + ')';
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }
  removeProfilePhoto() {
    const containerImage = document.querySelector('.img-profile');
    const removeImage = document.querySelector('.remove-img-profile');
    (containerImage as HTMLElement).style.backgroundImage = 'url(\' \')';
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

  public placesFiltered(place: any) {
    this.place = place;
    const { geometry: { location } } = place;
    if (location) {
      this.location = location;
      this.map.setZoom(14);
      this.map.moveTo(location.lat(), location.lng());
      // this.map.setCenter(location.lat(), location.lng());
      this.onRayChanged(1000);
    }
  }

  public filterRemoved() {
    this.place = null;
    console.log(this.place);
  }

  public onRayChanged = event => {
    if (event > 0) {
      const ray = event / 1000;
      this.map.clearLayers();
      this.addRay(this.location, ray);
      this.addMarker();
      window.dispatchEvent(new Event('resize'));
    }
  }

  private addRay(location: any, ray = 1, options = this.getPolygonOptions('#ff5e5e', '#ff5e5e')) {
    const turf = window['turf'];
    const point = turf.point([location.lng(), location.lat()]);
    const buffered = turf.buffer(point, ray, { units: 'kilometers' });
    buffered.properties = options;
    this.map.addGeoJSON(buffered);
  }

  private createPoint = (lat: number, lng: number) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    properties: {
      'marker-color': '#ea3f33',
      'marker-size': 'large',
      'marker-symbol': 'bus'
    }
  })

  private addMarker() {
    this.map.addGeoJSON(this.createPoint(this.location.lat(), this.location.lng()));
  }

  private getPolygonOptions = (stroke, fill) => ({
    fill, // line
    stroke, // back
    'stroke-width': 2,
    'fill-opacity': 0.5,
    'stroke-opacity': 0.5
  })
}
