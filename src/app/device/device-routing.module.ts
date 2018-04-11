import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapDeviceComponent } from './map-device/map-device.component';
import { GridDeviceComponent } from './grid-device/grid-device.component';

const routes: Routes = [
  {
    path: 'map',
    component: MapDeviceComponent
  },
  {
    path: 'grid',
    component: GridDeviceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
