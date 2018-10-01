import {
  Component,
  Output,
  Input,
  EventEmitter,
  NgZone,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { PlacesService } from '../../services/places.service';
import { Place } from '../../models/Place';

@Component({
  selector: 'sga-places-auto-complete',
  templateUrl: './places-auto-complete.component.html',
  styles: [],
  providers: [PlacesService]
})

export class PlacesAutoCompleteComponent implements AfterViewInit, OnInit, OnDestroy {

  @Input() public styleClass: string;
  @Input() public keepTextAddress: boolean;

  @Output() public onFilterRemovedEvent = new EventEmitter<any>();
  @Output() public onPlacesFilteredEvent = new EventEmitter<any>();

  @ViewChild('input') private input: ElementRef;

  public placeText: any;

  private place: any;
  private placesInput: any;
  private apiPlaces$: Subscription;



  constructor(private ngZone: NgZone, private placesService: PlacesService) { }

  ngOnInit() {
    this.placesInput = new google.maps.places.Autocomplete(
      <HTMLInputElement>this.input.nativeElement
    );
    this.placesInput.addListener('place_changed', () => this.setPlace());
  }

 searchPlace(place: string): Observable<Array<Place>> {
  if ( place.length > 3) {
    return this.placesService.getPlacesByTerm(place); 
  } else {
    return   Observable.empty();}
 }

  ngAfterViewInit() {
    const nativeElement: HTMLInputElement = this.input.nativeElement;
    this.placesInput = new google.maps.places.Autocomplete(nativeElement);
    this.placesInput.addListener('place_changed', () => this.setPlace());
    this.apiPlaces$ = Observable.fromEvent(this.input.nativeElement, 'keyup')
                                .debounceTime(1000)
                                .switchMap((k: any) => this.searchPlace(k.explicitOriginalTarget.value))
                                .subscribe(r => console.log(r));
  }

  ngOnDestroy(){
    this.apiPlaces$.unsubscribe();
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
