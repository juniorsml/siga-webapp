import {
  Component,
  Output,
  EventEmitter,
  NgZone,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'sga-places-auto-complete',
  templateUrl: './places-auto-complete.component.html',
  styles: []
})
export class PlacesAutoCompleteComponent implements AfterViewInit {
  @Output('onFilterRemovedEvent')
  public onFilterRemovedEvent = new EventEmitter<any>();

  @Output('onPlacesFilteredEvent')
  public onPlacesFilteredEvent = new EventEmitter<any>();

  @ViewChild('input') private input: ElementRef;

  public placeText: any;

  private place: any;
  private placesInput: any;

  constructor(private ngZone: NgZone) {
    this.placesInput = new google.maps.places.Autocomplete(
      <HTMLInputElement>document.getElementById('#mapFilter')
    );
    this.placesInput.addListener('place_changed', () => this.setPlace());
  }

  ngAfterViewInit() {
    const nativeElement: HTMLInputElement = this.input.nativeElement;
    this.placesInput = new google.maps.places.Autocomplete(nativeElement);
    this.placesInput.addListener('place_changed', () => this.setPlace());
  }

  public onPlacesKeyUp() {
    this.place = null;
    this.onFilterRemovedEvent.emit();
  }

  private setPlace() {
    this.ngZone.run(() => {
      if (this.placesInput.getPlace()) {
        this.place = this.placesInput.getPlace();
        this.propagatePlace();
      }
    });
  }

  private propagatePlace() {
    if (this.place) {
      this.onPlacesFilteredEvent.emit(this.place);
    } else {
      this.onFilterRemovedEvent.emit();
    }
  }
}
