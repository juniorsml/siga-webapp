import { Component, Output, OnInit, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Map } from '../../shared/models/Map';

import { TruckService } from '../truck.service'; 


import { Observable } from '../../../../node_modules/rxjs';
import { of } from '../../../../node_modules/rxjs';
import { concatMap} from '../../../../node_modules/rxjs/operators';



class RegisterForm {

    id: string;
    anttDueDate: Date;
    anttNumber: string;
    comunication: string;
    fleetNumber: number;
    // --  informacoes da carreta --
    tipo: string;
    colour: string;
    capacity: number;
    make: string;
    model: string;
    number: number;
    numberPlate: string;
    radius: number;
    renavan: number;
    tech: string;
    vehicleType: string;
    year: number;
    // Informacoes do motorista --

    ownerDocument: number;
    ownerName:  string;
    ownerDocumentType:  string;
    ownerDocumentId: number;
    ownerPhone: string;
    ownerCellPhone:  string;
}


@Component({
  selector: 'sga-register-truck',
  templateUrl: './register-truck.component.html',
  styleUrls: ['../../vehicle/register-vehicle/register-vehicle.component.scss']
})

export class RegisterTruckComponent implements OnInit {

  model: RegisterForm = new RegisterForm();
  @ViewChild('formTruck') formTruck: any;


  pt: any;
  private place: any;
  private location: any;

  public ray = 1000;

  file: File;
  truck ;



  @Input()
  public showForm: boolean;
  @Output() onFormClose: EventEmitter<void> = new EventEmitter();
  public selectedTabIndex = 0;

  constructor(private map: Map, private truckService: TruckService) {}




  ngOnInit() {
    this.map.createMapBoxMapInstance();
  }

  onSubmit() {
    if (this.formTruck.valid) {
    const truck$ = this.create(this.formTruck);
    const request$ = truck$.pipe(
          concatMap(truck => this.uploadAvatarImage(this.file, truck)))
          .concatMap( ( truck: any ) =>  (truck.value && truck.value.avatar) ? this.updateTruck(truck.value)
                                                                                                                        : of(truck));
          request$.subscribe(truck => this.onRegister(truck) , error => this.onError(error));
    }
  }

  public onRegister(truck){
    this.formTruck.reset();
    this.removeProfilePhoto();
    this.onFormClose.emit(truck);
  }

  uploadAvatarImage(file: File, truck): Observable <any> {
    if ( file === undefined || file === null ) {
          return of(truck);
    }

    const formdata: FormData = new FormData();

    formdata.append('file', file);
    formdata.append('name', truck.name);
    formdata.append('type', 'TRUCKS');
    formdata.append('correlationEntityId', truck.correlationEntityId);

    return this .truckService.uploadImage(formdata).map(avatar =>  { truck.avatar = avatar ; return of(truck); });
  }

  create(formTruck: NgForm): Observable<any> {
    const truck = this.buildTruck(formTruck, this.place);
    return this .truckService.saveTruck(truck);
  }

  public  updateTruck(truck) {
     return this.truckService.updateTruck(truck);
   }

   public buildTruck(formTruck: NgForm, place: any) {
     const truck = {
       country: place.address_components.filter(obj => obj.types.includes('country') ).map(obj =>  obj.long_name)[0],
       state: place.address_components.filter(obj => obj.types.includes('administrative_area_level_1') )
                                                                                      .map(obj =>  obj.long_name)[0],
       city: place.address_components.filter(obj => obj.types.includes('administrative_area_level_2') ).map(obj =>  obj.long_name)[0],
       vicinity: place.vicinity ,
       addressLine: place.formatted_address,
       ...formTruck.value,
        enabled: true
     };
     // hack para api enquanto nao aprendo do jeito certo
     // if(){

     // }
     // truck.asoDocDueDate = truck.asoDocDueDate.replace(/-/gi, '/');
     // truck.cddDocDueDate = truck.cddDocDueDate.replace(/-/gi, '/');
     // truck.moppDocDueDate = truck.moppDocDueDate.replace(/-/gi, '/');
     // truck.dateOfBirth = truck.dateOfBirth.replace(/-/gi, '/');

     return truck;
   }
   onSuccessCreate = (truck) => {
    return truck;
   }

   onError = error => console.log(error);


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
    (containerImage as HTMLElement).style.backgroundImage = 'url()';
    (containerImage as HTMLElement).style.display = 'none';
    (removeImage as HTMLElement).style.display = 'none';

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
  }

  cancel() {
   this.formTruck.reset();
   this.removeProfilePhoto();
   this.onFormClose.emit();
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
