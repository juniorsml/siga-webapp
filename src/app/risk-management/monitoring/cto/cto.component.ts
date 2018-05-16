import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'sga-cto',
  templateUrl: './cto.component.html',
  styles: []
})
export class CTOTripsComponent implements OnInit {
	@Input() trips = new Array();
  @Input() dataLoading: boolean = true;

  text: any;
  distance: any;
  placeText: any;
  styleClass: any;
  filterLocation: any;
  filterDistance: any;
  contextMenuSelected: any;

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
}
