import {
  Component,
  Output,
  Input,
  EventEmitter,
  NgZone,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';

@Component({
  selector: 'sga-places-auto-complete',
  templateUrl: './places-auto-complete.component.html',
  styles: []
})
export class PlacesAutoCompleteComponent implements AfterViewInit, OnInit {

  @Input() public styleClass: string;
  @Input() public keepTextAddress: boolean;

  @Output() public onFilterRemovedEvent = new EventEmitter<any>();
  @Output() public onPlacesFilteredEvent = new EventEmitter<any>();

  @ViewChild('input') private input: ElementRef;

  public placeText: any;

  private place: any;
  private placesInput: any;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.placesInput = new google.maps.places.Autocomplete(
      <HTMLInputElement>this.input.nativeElement
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
    if (!this.keepTextAddress) {
      this.placeText = ' ';
    }
  }

  private propagatePlace() {
    if (this.place) {
      this.onPlacesFilteredEvent.emit(this.place);
    } else {
      this.onFilterRemovedEvent.emit();
    }
  }
}
