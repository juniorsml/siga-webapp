import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableClickEvent } from '../../shared/components/table/table.component';
import { Router } from '@angular/router';

import { OptionClickEvent } from '../../shared/events/OptionClickEvent'; 
import { TruckService } from '../truck.service';

@Component({
  selector: 'sga-grid-truck',
  templateUrl: './grid-truck.component.html',
  styleUrls: ['../../vehicle/grid-vehicle/grid-vehicle.component.scss'],
  providers:[TruckService]
})
export class GridTruckComponent implements OnInit {

  public trucks = new Array();
  @Input() dataLoading: boolean = true;
  @Output() onVehicleSelected: EventEmitter<any> = new EventEmitter();

  public haveFooter: boolean = true;

  public text: any;
  public distance: any;
  public vehicle: any;
  public placeText: any;
  public styleClass: any;
  public filterLocation: any;
  public filterDistance: any;
  public selectedVehicle: any;


  public showDialog = false;
  public showVehicleDialog: boolean;

  public showColumnSelector = false;
  public showSendDialog = false;

  public showMessageDialog = false;
  public showNonConformityDialog = false;


  public headers = new Array<string>();
  public filterHeaders = new Array<string>();

  isLoading = true;

  
  closeColumnSelector() {
    this.showColumnSelector = false;
  }

  onSelectOption(event: OptionClickEvent) {
  switch (event.data.header) { 

     case 'Seleção de Colunas': 
      this.showColumnSelector = true;
      break;
     case 'Configuração': 
       this.route.navigateByUrl('truck/account');
       break;
    }
  }


  
   constructor(private truckService: TruckService,
              private route: Router) { }

  ngOnInit(): void {
    this
    .truckService
    .getTrucks()
    .subscribe(
      data => {
        this.isLoading = false;
        this.trucks = data
      })
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
  public contextMenuSelected = event => {
    switch (event) {
  
      case 3: 
        this.showSendDialog = true;
        break;
      case 4: 
        this.showMessageDialog = true;
        break;
       case 5:
        this.showNonConformityDialog = true;
    }
  }
  public sendDialogClose = () => this.showSendDialog = false;
  public messageDialogClose = () => this.showMessageDialog = false;
  public nonConformityDialogClose = () => this.showNonConformityDialog = false;



  public onPlacesKeyUp() {}

  public onDistanceKeyUp() {}

  public whenHeaderReady = headers => this.headers = headers;

  public onToggleItem = itemsSelected => this.filterHeaders = itemsSelected;
}
