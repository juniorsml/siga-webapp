import { VehicleService } from '../vehicle.service';
import { Component, Output, EventEmitter, Input, OnInit,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Map } from '../../shared/models/Map';

import { Observable } from '../../../../node_modules/rxjs';
import { of } from '../../../../node_modules/rxjs';
import { concatMap} from '../../../../node_modules/rxjs/operators';

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

export class RegisterVehicleComponent implements OnInit {

  model: RegisterForm = new RegisterForm();
  @ViewChild('formVehicle') formVehicle: any;
  anttDueDate: Date;
  comunication: string;

  private place: any;
  private location: any;

  public ray = 1000;

  @Input()
  public showForm: boolean;
  @Output() onSave = new EventEmitter();
  @Output() onFormClose: EventEmitter<void> = new EventEmitter();
  public selectedTabIndex = 0;
  file: File;
  vehicle ;


  constructor(
    private map: Map,
    private vehicleService: VehicleService) { }

  ngOnInit() {
    this.map.createMapBoxMapInstance();
  }

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
    formdata.append('name', vehicle.name);
    formdata.append('type', 'VEHICLES');
    formdata.append('correlationEntityId', vehicle.correlationEntityId);

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



  cancel() {
    this.onFormClose.emit();
  }

  create(formVehicle: NgForm): Observable<any> {
    const motorist = this.buildVehicle(formVehicle, this.place);
    return this .vehicleService.saveVehicle(motorist);
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
