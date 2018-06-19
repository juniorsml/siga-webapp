import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionClickEvent } from '../../../shared/events/OptionClickEvent';



@Component({
  selector: 'sga-scheduled',
  templateUrl: './scheduled.component.html',
  styles: []
})
export class ScheduledTripsComponent implements OnInit {
	@Input() trips = new Array();
  @Input() dataLoading = true;

  text: any;
  distance: any;
  placeText: any;
  styleClass: any;
  filterLocation: any;
  filterDistance: any;
  contextMenuSelected: any;
  showColumnSelector = false;
  haveFooter = true;


  closeColumnSelector() {
    this.showColumnSelector = false;
  }

  onSelectOption(event: OptionClickEvent) {
    switch (event.data.header) {
      case 'Seleção de Colunas':
        this.showColumnSelector = true;
        break;
      }
    }

  public headers = new Array<string>();
  public filterHeaders = new Array<string>();

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => this.trips = data.trips);
  }


  public onPlacesFiltered(event) {
    this.filterDistance = event.distance;
    this.filterLocation = { lat: event.lat, lng: event.lng };
  }

  public onPlacesFilterRemoved() {
    this.filterDistance = null;
    this.filterLocation = null;
  }

  public onPlacesKeyUp() {}

  public onDistanceKeyUp() {}


  public whenHeaderReady = headers => this.headers = headers;

  public onToggleItem = itemsSelected => this.filterHeaders = itemsSelected;
}
