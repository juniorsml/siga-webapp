import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableClickEvent } from '../../shared/components/table/table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-grid-vehicle',
  templateUrl: './grid-vehicle.component.html',
  styleUrls: ['./grid-vehicle.component.scss']
})
export class GridVehicleComponent implements OnInit {

  @Input() vehicles = new Array();
  @Input() dataLoading: boolean = true;
  @Output() onVehicleSelected: EventEmitter<any> = new EventEmitter();

  text: any;
  distance: any;
  motorist: any;
  placeText: any;
  styleClass: any;
  filterLocation: any;
  filterDistance: any;
  selectedVehicle: any;
  contextMenuSelected: any;

  showDialog = false;
  showVehicleDialog: boolean;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => this.vehicles = data.vehicles);
  }

  public showMotoristModal() {
    this.showMotoristDialog = true;
  }

  public motoristDialogClose() {
    this.showvehicleDialog = false;
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
