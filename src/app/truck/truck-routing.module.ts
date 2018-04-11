import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapTruckComponent } from './map-truck/map-truck.component';
import { GridTruckComponent } from './grid-truck/grid-truck.component';

const routes: Routes = [
  {
    path: 'map',
    component: MapTruckComponent
  },
  {
    path: 'grid',
    component: GridTruckComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TruckRoutingModule { }
