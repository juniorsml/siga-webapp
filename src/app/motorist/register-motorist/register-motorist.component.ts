import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MotoristService } from '../motorist.service';
import { Map } from '../../shared/models/Map';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concatMap } from 'rxjs/operators';
import { IMyDpOptions } from 'mydatepicker';

@Component( {
    selector: 'sga-register-motorist',
    templateUrl: './register-motorist.component.html',
    styleUrls: ['./register-motorist.component.scss'],
    providers: [MotoristService]
})

export class RegisterMotoristComponent implements OnInit {

  
  
  @Input() public showForm: boolean;
  @Output() onFormClose: EventEmitter < any > = new EventEmitter();

  formMotorist: FormGroup;

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
  currentTime = new Date();
  month = this.currentTime.getMonth() + 1;
  day = this.currentTime.getDate();
  year = this.currentTime.getFullYear();

  constructor(private fb:FormBuilder, private map: Map, private motoristService: MotoristService) {}
  ngOnInit() {
    this.map.createMapBoxMapInstance();


    this.formMotorist = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      dateOfBirth:['', Validators.required],
      motherName:['', Validators.required],
      documentId:['', Validators.required],
      documentType:['', Validators.required],
      maritalStatus:[],
      spouseName:[],
      numberOfChildren:[],
      phone:['', Validators.required],
      cellPhone:['', Validators.required],
      messagePhone:[],
      nextelPhone:[],
      radius:[],
      complement:[],
      moppDocDueDate:[],
      asoDocDueDate: [],
      cddDocDueDate: []


    })
  }

  isErrorVisible(field:string, error:string){
    
    return this.formMotorist.controls[field].dirty
            && this.formMotorist.controls[field].errors &&
            this.formMotorist.controls[field].errors[error];
  }

  public setBirthDate: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
    dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sáb'},
    todayBtnTxt: 'Hoje'
   };

   public setDueDate: IMyDpOptions = {
    disableUntil: {year: this.year, month: this.month, day: this.day},
    dateFormat: 'dd/mm/yyyy',
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
    dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sáb'},
    todayBtnTxt: 'Hoje'
  };

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
    formdata.append('correlationEntityId', motorist.id);

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
  create(formMotorist: FormGroup): Observable<any> {
    const motorist = this.buildMotorist(formMotorist, this.place);
    return this .motoristService.saveMotorist(motorist);
  }
 public  updateMotorist(motorist) {
    return this.motoristService.updateMotorist(motorist);
  }

  public buildMotorist(formMotorist: FormGroup, place: any) {
    debugger
    const motorist = {
      address: {
         country: place.address_components.filter(obj => obj.types.includes('country') ).map(obj =>  obj.long_name)[0],
         state: place.address_components.filter(obj => obj.types.includes('administrative_area_level_1') )
                                                                                        .map(obj =>  obj.long_name)[0],
         city: place.address_components.filter(obj => obj.types.includes('administrative_area_level_2') ).map(obj =>  obj.long_name)[0],
         vicinity: place.vicinity ,
         addressLine: place.formatted_address,
         complement: formMotorist.value.complement,
         street: place.name
      },

      ...formMotorist.value,  
       enabled: true
    };
    // hack para api enquanto nao aprendo do jeito certo
    // if(){

    // }
    // motorist.asoDocDueDate = formMotorist.value.asoDocDueDate.formatted;
    // motorist.cddDocDueDate = formMotorist.value.cddDocDueDate.formatted;
    motorist.moppDocDueDate = formMotorist.value.moppDocDueDate.formatted;
    motorist.dateOfBirth = formMotorist.value.dateOfBirth.formatted;
    console.log(motorist);
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
