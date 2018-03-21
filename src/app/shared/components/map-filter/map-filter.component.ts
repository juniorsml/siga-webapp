import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
  NgZone,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'sga-map-filter',
  templateUrl: './map-filter.component.html'
})
export class MapFilterComponent implements AfterViewInit {
  @Input() styleClass: string;
  @Output('placesFiltered') public placesFilteredEvent: EventEmitter<any>;
  @Output('filterRemoved') public filterRemoved: EventEmitter<any>;
  @ViewChild('input') public input: ElementRef;
  placesInput: any;
  distance: any;
  location: any;
  placeText: string;

  constructor(private ngZone: NgZone) {
    this.placesFilteredEvent = new EventEmitter();
    this.filterRemoved = new EventEmitter();
    this.placesInput = new google.maps.places.Autocomplete(<HTMLInputElement> document.getElementById('#mapFilter'));
    this.placesInput.addListener('place_changed', () => this.setLocation());
  }

  setLocation() {
    this.ngZone.run(() => {
      if (this.placesInput.getPlace()){
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
      this.placesFilteredEvent.emit({
        lat: this.location.lat(),
        lng: this.location.lng(),
        distance: this.distance
      });
    } else {
      this.filterRemoved.emit();
    }
  }

  ngAfterViewInit() {
    // Initialize places input
    var nativeElement: HTMLInputElement = this.input.nativeElement;
    this.placesInput = new google.maps.places.Autocomplete(nativeElement);
    this.placesInput.addListener('place_changed', () => this.setLocation());
  }
}
