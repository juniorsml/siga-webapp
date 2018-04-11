import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapVehicleComponent } from './map-vehicle/map-vehicle.component';
import { GridVehicleComponent } from './grid-vehicle/grid-vehicle.component';

const routes: Routes = [
  {
    path: 'map',
    component: MapVehicleComponent
  },
  {
    path: 'grid',
    component: GridVehicleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
