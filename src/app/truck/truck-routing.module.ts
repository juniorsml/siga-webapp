import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapTruckComponent } from './map-truck/map-truck.component';
import { GridTruckComponent } from './grid-truck/grid-truck.component';
import { AssociateTruckComponent } from './associate-truck/associate-truck.component';

import { vehicles } from '../shared/mocks/vehicles';

const routes: Routes = [
  {
    path: 'map',
    component: MapTruckComponent
  },
  {
    path: 'grid',
    component: GridTruckComponent,
    data: { vehicles }
  },
  {
    path: 'account',
    component: AssociateTruckComponent,
    data: { vehicles }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TruckRoutingModule { }
