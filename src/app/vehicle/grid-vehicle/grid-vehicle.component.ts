import { Component, OnInit } from '@angular/core';
import { TableClickEvent } from '../../shared/components/table/table.component';
import { Router } from '@angular/router';
import { OptionClickEvent } from '../../shared/events/OptionClickEvent';
import { Vehicle } from '../../shared/models/api/Vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'sga-grid-vehicle',
  templateUrl: './grid-vehicle.component.html',
  styleUrls: ['./grid-vehicle.component.scss'],
  providers: [VehicleService]
})
export class GridVehicleComponent implements OnInit {

  text: any;
  distance: any;
  vehicle: any;
  placeText: any;
  styleClass: any;
  filterLocation: any;
  filterDistance: any;
  selectedVehicle: any;

  showDialog = false;
  showVehicleDialog: boolean;

   showSendDialog = false;

  showColumnSelector = false;

  public headers = new Array<string>();
  public vehicles = new Array<Vehicle>();
  public filterHeaders = new Array<string>();

  closeColumnSelector() {
    this.showColumnSelector = false;
  }

  onSelectOption(event: OptionClickEvent) {
    switch (event.data.header) {
      case 'Seleção de Colunas':
        this.showColumnSelector = true;
        break;
      case 'Configuração':
        this.route.navigateByUrl('vehicle/account');
        break;
    }
  }

  constructor(
    private route: Router,
    private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getMotorists();
  }

  private getMotorists() {
    this
      .vehicleService
      .getVehicles()
      .subscribe(
        data => this.onSuccess(data),
        error => alert(error));
  }

  private onSuccess(data) {
    this.vehicles = data;
  }

  public showVehicleModal() {
    this.showVehicleDialog = true;
  }

  public vehicleDialogClose() {
    this.showVehicleDialog = false;
  }

  public onCellClick(event) {
    this.selectedVehicle = event.data;
    // this.onVehicleSelected.emit(this.selectedVehicle);
    if (event.cellIndex === 0) {
      this.showVehicleDialog = true;
    }
  }

  onCellRightClick(event: TableClickEvent) {
    this.selectedVehicle = event.data;
    // this.onVehicleSelected.emit(this.selectedVehicle);
  }

  public onPlacesFiltered(event) {
    this.filterDistance = event.distance;
    this.filterLocation = { lat: event.lat, lng: event.lng };
  }

  public onPlacesFilterRemoved() {
    this.filterDistance = null;
    this.filterLocation = null;
  }



  public contextMenuSelected = event => {
    switch (event) {
 
      case 4:        
        this.showSendDialog = true;
     }
  }
  public sendDialogClose = () => this.showSendDialog = false;

  public onPlacesKeyUp() { }

  public onDistanceKeyUp() { }

  public whenHeaderReady = headers => this.headers = headers;

  public onToggleItem = itemsSelected => this.filterHeaders = itemsSelected;
}
