import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapVehicleComponent } from './map-vehicle/map-vehicle.component';
import { GridVehicleComponent } from './grid-vehicle/grid-vehicle.component';
import { AssociateVehicleComponent } from './associate-vehicle/associate-vehicle.component';

import { vehicles } from '../shared/mocks/vehicles';

const routes: Routes = [
  {
    path: 'map',
    component: MapVehicleComponent,
    data: { vehicles }
  },
  {
    path: 'grid',
    component: GridVehicleComponent,
    data: { vehicles }
  },
  {
    path: 'account',
    component: AssociateVehicleComponent,
    data: { vehicles }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
