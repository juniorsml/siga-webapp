import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableClickEvent } from '../../shared/components/table/table.component';
import { ActivatedRoute,Router } from '@angular/router';
import { OptionClickEvent } from '../../shared/events/OptionClickEvent';

@Component({
  selector: 'sga-grid-vehicle',
  templateUrl: './grid-vehicle.component.html',
  styleUrls: ['./grid-vehicle.component.scss']
})
export class GridVehicleComponent implements OnInit {

  @Input() vehicles = new Array();
  @Input() dataLoading: boolean = true;
  @Input() haveFooter: boolean = true;
  @Output() onVehicleSelected: EventEmitter<any> = new EventEmitter();

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

  public headers = new Array<string>();
  public filterHeaders = new Array<string>();


  constructor(private router: ActivatedRoute,
              private route: Router) { }

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


  public contextMenuSelected = event => {
    switch (event) {
 
      case 4:        
        this.showSendDialog = true;
     }
  }
  public sendDialogClose = () => this.showSendDialog = false;

  public onPlacesKeyUp() {}

  public onDistanceKeyUp() {}

  public whenHeaderReady = headers => this.headers = headers;

  public onToggleItem = itemsSelected => this.filterHeaders = itemsSelected;
}
