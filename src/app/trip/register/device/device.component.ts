import { Component, OnInit,Input } from '@angular/core';
import { TripObject } from '../../../shared/services/trip-object.service';
import { DeviceService } from '../../../device/device.service';

@Component({
  selector: 'sga-device',
  templateUrl: './device.component.html',
  styleUrls: ['../motorist/motorist.component.scss'],
  providers:[DeviceService]
})
export class DeviceComponent implements OnInit {

  selectedDevice: any;
  public devices: Array<any>;
  public associateDevice = new Array<any>();

  public deviceInfos = new Array<any>();


  public showRegisterForm = false;
  
  @Input()
  public showBreadcrumb = false;

  constructor(private deviceService: DeviceService, private formService : TripObject) {}

  ngOnInit(): void {
    this
    .deviceService
    .getDevices()
    .subscribe(data => this.devices = data)
  }


  ngOnDestroy(){ 
    
    this.formService.updateObj(this.deviceInfos,'devices');
   
    let unwrap = ({id, model, tech}) => ({id, model, tech});

    for(let item of this.associateDevice){
       const filterDeviceKey = unwrap(item);
       this.deviceInfos.push(filterDeviceKey);
    }
  }

  public showDeviceForm(event): void {
    event;
    this.showRegisterForm = true;
  }

  public closeFormRegister() {
    this.showRegisterForm = false;
  }

  public showDeviceData(device) {
    this.selectedDevice = device;
  }

  public onDeviceSelected(device: any): void {
    this.associateDevice.push(device);
    this.selectedDevice = device;
  }

  public removeAssociate(device: any): void {
    const index = this.associateDevice.findIndex(a => a === device);
    this.associateDevice.splice(index, 1);
  }
}
