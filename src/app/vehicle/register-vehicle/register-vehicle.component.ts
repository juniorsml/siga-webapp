import { VehicleService } from '../vehicle.service';
import { Component, Output, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';


import { Map } from '../../shared/models/Map';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concatMap } from 'rxjs/operators';

import { Vehicle } from '../../shared/models/api/Vehicle'


@Component({
  selector: 'sga-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.scss'],
  providers: [VehicleService]
})

export class RegisterVehicleComponent implements OnInit {

  model: Vehicle;


  @ViewChild('formVehicle') formVehicle: any;

  
  anttDueDate: Date;
  comunication: string;

  private place: any;
  private location: any;

  public radius = 1000;

  @Input()
  public showForm: boolean;
  @Output() onSave = new EventEmitter();
  @Output() onFormClose: EventEmitter<void> = new EventEmitter();
  public selectedTabIndex = 0;

  mobilephone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  landlinephone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  file: File;
  vehicle ;

  currentTime = new Date();
  month = this.currentTime.getMonth() + 1;
  day = this.currentTime.getDate();
  year = this.currentTime.getFullYear();

  constructor(
    private map: Map,
    private vehicleService: VehicleService) { }

  ngOnInit() {
    this.map.createMapBoxMapInstance();
  }

  public setDateDueANTT: IMyDpOptions = {
    disableUntil: {year: this.year, month: this.month, day: this.day},
    dateFormat: 'dd/mm/yyyy',
   };

  onSubmit() {
    if (this.formVehicle.valid) {
    const vehicle$ = this.create(this.formVehicle);
    const request$ = vehicle$.pipe(
          concatMap(vehicle => this.uploadAvatarImage(this.file, vehicle)))
            .concatMap( ( vehicle: any ) =>  (vehicle.value && vehicle.value.avatar) ? this.updateVehicle(vehicle.value)
                                                                                                                        : of(vehicle));
          request$.subscribe(vehicle => this.onRegister(vehicle) , error => this.onError(error));
    }
  }

  uploadAvatarImage(file: File, vehicle): Observable <any> {
    if ( file === undefined || file === null ) {
          return of(vehicle);
    }

    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('name', vehicle.numberPlate);
    formdata.append('type', 'VEHICLE');
    formdata.append('correlationEntityId', vehicle.id);

    return this .vehicleService.uploadImage(formdata).map(avatar =>  { vehicle.avatar = avatar ; return of(vehicle); });
  }

  public onRegister(vehicle) {
    this.formVehicle.reset();
    this.removeProfilePhoto();
    this.onFormClose.emit(vehicle);
  }

  public updateVehicle(vehicle) {
     return this.vehicleService.updateVehicle(vehicle);
   }

  public buildVehicle(formVehicle: NgForm, place: any) {
    const vehicle = {
      address: {
         country: place.address_components.filter(obj => obj.types.includes('country') ).map(obj =>  obj.long_name)[0],
         state: place.address_components.filter(obj => obj.types.includes('administrative_area_level_1') )
                                                                                        .map(obj =>  obj.long_name)[0],
         city: place.address_components.filter(obj => obj.types.includes('administrative_area_level_2') ).map(obj =>  obj.long_name)[0],
         vicinity: place.vicinity ,
         addressLine: place.formatted_address,
         complement: formVehicle.value.complement,
         number: formVehicle.value.number,
         street: place.name
      },

      // TODO : usar formgroup para criar objeto
       ...formVehicle.value,
       enabled: true
    };
    vehicle.anttDueDate = vehicle.anttDueDate.replace(/-/gi, '/');
    return vehicle;
  }

  // Show image profile
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
      this.file = event.target.files[0];
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



  cancel() {
    this.formVehicle.reset();
    this.removeProfilePhoto();
    this.onFormClose.emit();
  }

  create(formVehicle: NgForm): Observable<any> {
    const vehicle = this.buildVehicle(formVehicle, this.place);
    return this .vehicleService.saveVehicle(vehicle);
  }



  onSuccess(data) {
    console.log(data);
    this.onSave.emit();
    this.onFormClose.emit();
  }

  onError(error) {
    console.error(error);
  }

  public placesFiltered(place: any) {
    this.place = place;
    const { geometry: { location } } = place;
    if (location) {
      this.location = location;
      this.map.setZoom(14);
      this.map.moveTo(location.lat(), location.lng());
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
