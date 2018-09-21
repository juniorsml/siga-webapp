import { Component, OnInit, Input , OnDestroy } from '@angular/core';
import { TableClickEvent } from '../../shared/components/table/table.component';
import { Router } from '@angular/router';
import { OptionClickEvent } from '../../shared/events/OptionClickEvent';

import { DeviceService } from '../device.service';

import { Device } from '../../shared/models/api/Device';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sga-grid-device',
  templateUrl: './grid-device.component.html',
  styleUrls: ['./grid-device.component.scss'],
  providers: [DeviceService]
})
export class GridDeviceComponent implements OnInit , OnDestroy {
  

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

  public showDeviceDialog = false;
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
  public _reload = new BehaviorSubject<boolean>(false);

  public devices = new Array<Device>();
  
  @Input()
  set reload(reload: boolean) {
     this._reload.next(reload);
  }

  
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

constructor( private deviceService: DeviceService, private route: Router) { }

ngOnInit(): void {
    this._reload.subscribe(() => this.getDevices());
    this.getDevices();
}
ngOnDestroy(): void {
  this._reload.unsubscribe();
}


private getDevices() {
    this
      .deviceService
      .getDevices()
      .subscribe(
        data => this.onSuccess(data),
        error => alert(error));
  }

  private onSuccess(data) {
    this.devices = data;
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
    if (event.cellIndex === 0) { this.showDeviceDialog = true; }
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

  public deviceDialogClose = () => this.showDeviceDialog = false;
  public sendDialogClose = () => this.showSendDialog = false;
  public messageDialogClose = () => this.showMessageDialog = false;
  public nonConformityDialogClose = () => this.showNonConformityDialog = false;


  public whenHeaderReady = headers => this.headers = headers;

  public onToggleItem = itemsSelected => this.filterHeaders = itemsSelected;
}
