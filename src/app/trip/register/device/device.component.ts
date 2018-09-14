import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../dataform.service';

@Component({
  selector: 'sga-device',
  templateUrl: './device.component.html',
  styleUrls: ['../motorist/motorist.component.scss'],
  providers:[FormService]
})
export class DeviceComponent implements OnInit {

  selectedDevice: any;
  public devices: Array<any>;
  public associateDevice = new Array<any>();

  public deviceInfos = new Array<any>();


  public showRegisterForm = false;
  
  @Input()
  public showBreadcrumb = false;

  constructor(private router: ActivatedRoute, private formService : FormService) {}

  ngOnInit(): void {
    this.router.data.subscribe(
      data => (this.devices = data.devices || new Array<any>())
    );
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
