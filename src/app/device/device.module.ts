import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { GridDeviceComponent } from './grid-device/grid-device.component';
import { MapDeviceComponent } from './map-device/map-device.component';

@NgModule({
  imports: [
    CommonModule,
    DeviceRoutingModule
  ],
  declarations: [GridDeviceComponent, MapDeviceComponent]
})
export class DeviceModule { }
