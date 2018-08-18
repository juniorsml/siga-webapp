import { Component, Output, OnInit, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MotoristService } from '../motorist.service'; 
import { Map } from '../../shared/models/Map';

import { Observable } from '../../../../node_modules/rxjs';
import { of } from '../../../../node_modules/rxjs';
import { concatMap} from '../../../../node_modules/rxjs/operators';

class RegisterForm {
  // Personal Info
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  motherName: string;
  documentType: string;
  documentId: string;
  maritalStatus: string;
  wifeName: string;
  haveChildren: string;
  numberOfChildren: number;
  educationalLevel: string;
  cnhNumber: string;
  cnhCategory: string;
  dueDate: string;
  ray: number;
   // Address
  addressNumber: string;
  complementAddress:string;
  addressLine: string;
  country: string;
  city: string;
  state: string;
  phone:string;
  cellPhone: string;
  messagePhone: string;

  nextelPhone: string; 
  // Profile
  bond: string;
  moppDocDueDate: Date;
  asoDocDueDate: Date;
  cddDocDueDate: Date;
}

@Component( {
    selector: 'sga-register-motorist',
    templateUrl: './register-motorist.component.html',
    styleUrls: ['./register-motorist.component.scss'],
    providers: [MotoristService]
})

export class RegisterMotoristComponent implements OnInit {

  model: RegisterForm=new RegisterForm();
  @Input() public showForm: boolean;
  @Output() onFormClose: EventEmitter < any > = new EventEmitter();
  @ViewChild('formMotorist') formMotorist: any;

  public selectedTabIndex=0;
  public ray=1000;
  private place: any;
  private location: any;
  pt: any;
  mobilephone=['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  messagephone=['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  landlinephone=['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  file: File;
  motorist ;

  constructor(private map: Map, private motoristService: MotoristService) {}
  ngOnInit() {
    this.map.createMapBoxMapInstance();
  }
  onSubmit() {
    if (this.formMotorist.valid) {
    const motorist$ = this.create(this.formMotorist);
    const request$ = motorist$.pipe(
          concatMap(motorist => this.uploadAvatarImage(this.file, motorist)))
          .concatMap( ( motorist: any ) =>  (motorist.value && motorist.value.avatar) ? this.updateMotorist(motorist.value)
                                                                                                                        : of(motorist));
          request$.subscribe(motorist => this.onRegister(motorist) , error => this.onError(error));
    }
  }
  
  public onRegister(motorist){
    this.formMotorist.reset();
    this.removeProfilePhoto();
    this.onFormClose.emit(motorist);
  }
  // Show image profile
  addProfilePhoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader=new FileReader();
      reader.onload=(element: any)=> {
        const url=element.target.result;
        const removeImage=document.querySelector('.remove-img-profile');
        const containerImage=document.querySelector('.img-profile');
        (removeImage as HTMLElement).style.display='flex';
        (containerImage as HTMLElement).style.display='block';
        (containerImage as HTMLElement).style.backgroundImage='url('+url+')';
      };
      this.file = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadAvatarImage(file: File, motorist): Observable <any> {
    if ( file === undefined || file === null ) {
          return of(motorist);
    }

    const formdata: FormData = new FormData();

    formdata.append('file', file);
    formdata.append('name', motorist.name);
    formdata.append('type', 'MOTORISTS');
    formdata.append('correlationEntityId', motorist.correlationEntityId);

    return this .motoristService.uploadImage(formdata).map(avatar =>  { motorist.avatar = avatar ; return of(motorist); });
  }

  removeProfilePhoto() {
    const containerImage=document.querySelector('.img-profile');
    const removeImage=document.querySelector('.remove-img-profile');
    (containerImage as HTMLElement).style.backgroundImage='url(\' \')';
    (containerImage as HTMLElement).style.display = 'none';
    (removeImage as HTMLElement).style.display =' none';
    this.file = null;
  }
  cancel() {
    this.formMotorist.reset();
    this.removeProfilePhoto();
    this.onFormClose.emit();
  }
  create(formMotorist: NgForm): Observable<any> {
    const motorist = this.buildMotorist(formMotorist, this.place);
    return this .motoristService.saveMotorist(motorist);
  }
 public  updateMotorist(motorist) {
    return this.motoristService.updateMotorist(motorist);
  }

  public buildMotorist(formMotorist: NgForm, place: any) {
    const motorist = {
      country: place.address_components.filter(obj => obj.types.includes('country') ).map(obj =>  obj.long_name)[0],
      state: place.address_components.filter(obj => obj.types.includes('administrative_area_level_1') )
                                                                                     .map(obj =>  obj.long_name)[0],
      city: place.address_components.filter(obj => obj.types.includes('administrative_area_level_2') ).map(obj =>  obj.long_name)[0],
      vicinity: place.vicinity ,
      addressLine: place.formatted_address,
      ...formMotorist.value,
       enabled: true
    };
    // hack para api enquanto nao aprendo do jeito certo
    // if(){

    // }
    motorist.asoDocDueDate = motorist.asoDocDueDate.replace(/-/gi, '/');
    motorist.cddDocDueDate = motorist.cddDocDueDate.replace(/-/gi, '/');
    motorist.moppDocDueDate = motorist.moppDocDueDate.replace(/-/gi, '/');
    motorist.dateOfBirth = motorist.dateOfBirth.replace(/-/gi, '/');

    return motorist;
  }
  onSuccessCreate = (motorist) => {
   return motorist;
  }

  onError=error=>console.log(error);

  public placesFiltered(place: any) {
    this.place=place;
    const {
      geometry: {
        location
      }
    }
    =place;
    if (location) {
      this.location=location;
      this.map.setZoom(14);
      this.map.moveTo(location.lat(), location.lng()); // this.map.setCenter(location.lat(), location.lng());
      this.onRayChanged(1000);
    }
  }
  public filterRemoved() {
    this.place = null;
    console.log(this.place);
  }
  public onRayChanged = event => {
    if (event > 0) {
      const ray=event / 1000;
      this.map.clearLayers();
      this.addRay(this.location, ray);
      this.addMarker();
      window.dispatchEvent(new Event('resize'));
    }
  }
  private addRay(location: any, ray=1, options=this.getPolygonOptions('#ff5e5e', '#ff5e5e')) {
    const turf=window['turf'];
    const point=turf.point([location.lng(), location.lat()]);
    const buffered=turf.buffer(point, ray, {
      units: 'kilometers'
    }
    );
    buffered.properties=options;
    this.map.addGeoJSON(buffered);
  }
  private createPoint = (lat: number, lng: number) => ( {
    type: 'Feature', geometry: {
      type: 'Point', coordinates: [lng, lat]
    }
    , properties: {
      'marker-color': '#ea3f33', 'marker-size': 'large', 'marker-symbol': 'bus'
    }
  })
  private addMarker() {
    this.map.addGeoJSON(this.createPoint(this.location.lat(), this.location.lng()));
  }
  private getPolygonOptions=(stroke, fill)=>( {
    fill, // line
    stroke, // back
    'stroke-width': 2, 'fill-opacity': 0.5, 'stroke-opacity': 0.5
  }
  )
}
