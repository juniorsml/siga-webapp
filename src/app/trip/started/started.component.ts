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
  selectedMotorist: any;
  contextMenuSelected: any;

  showDialog = false;
  showMotoristDialog: boolean;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => this.trips = data.trips);
  }

  public showMotoristModal() {
    this.showMotoristDialog = true;
  }

  public motoristDialogClose() {
    this.showMotoristDialog = false;
  }

  public onCellClick(event) {
    this.selectedMotorist = event.data;
    this.onMotoristSelected.emit(this.selectedMotorist);
    if (event.cellIndex === 0) this.showMotoristDialog = true;
  }

  onCellRightClick(event: TableClickEvent) {
    this.selectedMotorist = event.data;
    this.onMotoristSelected.emit(this.selectedMotorist);
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
