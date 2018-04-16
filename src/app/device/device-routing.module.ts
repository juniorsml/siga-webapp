import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { devices } from '../shared/mocks/device';

import { MapDeviceComponent } from './map-device/map-device.component';
import { GridDeviceComponent } from './grid-device/grid-device.component';
import { ConfigDeviceComponent } from './config-device/config-device.component';
import { RegisterDeviceComponent } from './register-device/register-device.component';


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
  },
  {
    path: 'register',
    component: RegisterDeviceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule {}
