import { Component, Output, OnInit, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Map } from '../../shared/models/Map';

class RegisterForm {
}


@Component({
  selector: 'sga-register-truck',
  templateUrl: './register-truck.component.html',
  styleUrls: ['../../vehicle/register-vehicle/register-vehicle.component.scss']
})

export class RegisterTruckComponent implements OnInit {

  model: RegisterForm = new RegisterForm();
  @ViewChild('formTruck') formTruck: any;
  anttDueDate: Date;
  comunication: string;
  pt: any;
  private place: any;
  private location: any;

  public ray = 1000;

  @Input()
  public showForm: boolean;
  @Output() onFormClose: EventEmitter<void> = new EventEmitter();
  public selectedTabIndex = 0;

  constructor(private map: Map) { }

  ngOnInit() {
    this.map.createMapBoxMapInstance();
  }

  onSubmit() {
    if (this.formTruck.valid) {
      console.log('Form Submitted!');
      this.formTruck.reset();
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
    this.onFormClose.emit();
  }

  create(formTruck: NgForm) {
    const truck = {
      location: this.place.formatted_address,
      ...formTruck.value
    };

    console.log(truck);
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
