import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableClickEvent } from '../../shared/components/table/table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-grid-truck',
  templateUrl: './grid-truck.component.html',
  styleUrls: ['../../vehicle/grid-vehicle/grid-vehicle.component.scss']
})
export class GridTruckComponent implements OnInit {

  @Input() vehicles = new Array();
  @Input() dataLoading: boolean = true;
  @Output() onVehicleSelected: EventEmitter<any> = new EventEmitter();

  text: any;
  distance: any;
  vehicle: any;
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

  public showVehicleModal() {
    this.showVehicleDialog = true;
  }

  public vehicleDialogClose() {
    this.showVehicleDialog = false;
  }

  public onCellClick(event) {
    this.selectedVehicle = event.data;
    this.onVehicleSelected.emit(this.selectedVehicle);
    if (event.cellIndex === 0) this.showVehicleDialog = true;
  }

  onCellRightClick(event: TableClickEvent) {
    this.selectedVehicle = event.data;
    this.onVehicleSelected.emit(this.selectedVehicle);
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
