import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapDeviceComponent } from './map-device/map-device.component';
import { GridDeviceComponent } from './grid-device/grid-device.component';
import { ConfigDeviceComponent } from './config-device/config-device.component';

import { devices } from '../shared/mocks/device';

const routes: Routes = [
  {
    path: 'map',
    component: MapDeviceComponent,
    data: { devices }
  },
  {
    path: 'grid',
    component: GridDeviceComponent,
    data: { devices }
  },
  {
    path: 'config',
    component: ConfigDeviceComponent,
    data: { devices }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule {}
