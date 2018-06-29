import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
  NgZone,
  OnInit
} from '@angular/core';

@Component({
  selector: 'sga-map-filter',
  templateUrl: './map-filter.component.html'
})
export class MapFilterComponent implements OnInit {
  @Input() styleClass: string;

  @Output() public placesFiltered: EventEmitter<any> = new EventEmitter();
  @Output() public filterRemoved: EventEmitter<any> = new EventEmitter();
  @ViewChild('input') public input: ElementRef;
  placesInput: any;
  distance: any;
  location: any;
  placeText: string;

  constructor(private ngZone: NgZone) {  }

  ngOnInit() {
    // Initialize places input
    this.placesInput = new google.maps.places.Autocomplete(<HTMLInputElement> this.input.nativeElement);
    this.placesInput.addListener('place_changed', () => this.setLocation());
    this.location = null;
  }

  setLocation() {
    this.ngZone.run(() => {
      if (this.placesInput.getPlace()) {
        this.location = this.placesInput.getPlace().geometry.location;
        this.setDistanceAndLocation();
      }
    });
  }

  onDistanceKeyUp() {
    this.setLocation();
  }

  onPlacesKeyUp() {
    this.location = null;
    this.filterRemoved.emit();
  }

  setDistanceAndLocation() {
    if (
      !isNaN(this.distance) &&
      this.distance !== '' &&
      this.location !== 'undefined' &&
      this.location !== null
    ) {
      this.placesFiltered.emit({
        lat: this.location.lat(),
        lng: this.location.lng(),
        distance: this.distance
      });
    } else {
      this.filterRemoved.emit();
    }
  }
}
