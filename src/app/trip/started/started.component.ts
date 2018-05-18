import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionClickEvent } from '../../shared/events/OptionClickEvent';


@Component({
  selector: 'sga-started',
  templateUrl: './started.component.html',
  styles: []
})
export class StartedTripsComponent implements OnInit {
  @Input() public trips = new Array();
  @Input() public dataLoading = true;

  public text: any;
  public distance: any;
  public motorist: any;
  public placeText: any;
  public styleClass: any;
  public stepIndex: number;
  public selectedTrip: any;
  public filterLocation: any;
  public filterDistance: any;
  public showTripDialog = false;
  public showSummaryDialog = false;
  showColumnSelector = false;


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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.trips = data.trips);
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

  public updateSelectedTrip(event) {
    this.selectedTrip = event.data;
  }

  public contextMenuSelected(index) {
    this.stepIndex = index;
    this.showSummaryDialog = true;
  }

  public summaryDialogClose(){
    this.showSummaryDialog = false;
  }

  public whenHeaderReady = headers => this.headers = headers;

  public onToggleItem = itemsSelected => this.filterHeaders = itemsSelected;
}
