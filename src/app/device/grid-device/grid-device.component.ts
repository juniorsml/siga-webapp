import { Component, OnInit, Input } from '@angular/core';
import { TableClickEvent } from '../../shared/components/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionClickEvent } from '../../shared/events/OptionClickEvent';


@Component({
  selector: 'sga-grid-device',
  templateUrl: './grid-device.component.html',
  styleUrls: ['./grid-device.component.scss']
})
export class GridDeviceComponent implements OnInit {

  public text: any;
  public styleClass: any;
  public filterLocation: any;
  public filterDistance: any;
  public selectedDevice: any;
  public onDeviceSelected: any;

  public haveFooter = true;

  public showColumnSelector = false;

  public headers = new Array<string>();
  public filterHeaders = new Array<string>();

  public showSendDialog = false;
  public showMessageDialog = false;
  public showNonConformityDialog = false;


  @Input()
  public hasHeight = false;

  @Input()
  public showFilterBar = true;

  @Input()
  public showBreadcrumb = true;

  @Input()
  public devices = new Array<any>();


  closeColumnSelector() {
    this.showColumnSelector = false;
  }

  onSelectOption(event: OptionClickEvent) {
    switch (event.data.header) {
      case 'Seleção de Colunas':
        this.showColumnSelector = true;
        break;
      case 'Configuração':
        this.route.navigateByUrl('device/config');
        break;
    }
  }

  constructor(private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => this.devices = data.devices);
  }

  public onPlacesFiltered(event) {
    this.filterDistance = event.distance;
    this.filterLocation = { lat: event.lat, lng: event.lng };
  }

  public onPlacesFilterRemoved() {
    this.filterDistance = null;
    this.filterLocation = null;
  }

  public onCellClick(event) {
    this.selectedDevice = event.data;
    this.onDeviceSelected.emit(this.selectedDevice);
    // if (event.cellIndex === 0) this.showMotoristDialog = true;
  }

  public onCellRightClick(event: TableClickEvent) {
    this.selectedDevice = event.data;
    this.onDeviceSelected.emit(this.selectedDevice);
  }
  public contextMenuSelected = event => {
    switch (event) {
  
       case 2: 
         this.showSendDialog = true;
         break;
       case 3: 
         this.showMessageDialog = true;
            break;
      case 4:
        this.showNonConformityDialog = true;
    }
  }
  public sendDialogClose = () => this.showSendDialog = false;

  public messageDialogClose = () => this.showMessageDialog = false;
  public nonConformityDialogClose = () => this.showNonConformityDialog = false;


  public whenHeaderReady = headers => this.headers = headers;

  public onToggleItem = itemsSelected => this.filterHeaders = itemsSelected;
}
