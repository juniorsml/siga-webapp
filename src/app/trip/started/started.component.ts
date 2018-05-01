import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'sga-started',
  templateUrl: './started.component.html',
  styles: []
})
export class StartedTripsComponent implements OnInit {
	@Input() trips = new Array();
  @Input() dataLoading: boolean = true;

  text: any;
  distance: any;
  motorist: any;
  placeText: any;
  styleClass: any;
  filterLocation: any;
  filterDistance: any;
  showTripDialog = false;
  
  public showSummaryDialog = false;


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

  contextMenuSelected() {
      this.showSummaryDialog = true;
      // switch (menuIndex) {
      //     case 0:
      //         this.tripDialogIndex = 0;
      //         break;
      //     case 1:
      //         this.tripDialogIndex = 1;
      //         break;
      //     case 2:
      //         this.tripDialogIndex = 2;
      //         break;
      //     case 3:
      //         this.tripDialogIndex = 3;
      //         break;
      //     case 4:
      //         this.tripDialogIndex = 4;
      //         break;
      // }
  }
  summaryDialogClose(){
    this.showSummaryDialog = false;
  }

}
