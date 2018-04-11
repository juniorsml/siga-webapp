import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapCarrierComponent } from './map-carrier/map-carrier.component';
import { GridCarrierComponent } from './grid-carrier/grid-carrier.component';

const routes: Routes = [
  {
    path: 'map',
    component: MapCarrierComponent
  },
  {
    path: 'grid',
    component: GridCarrierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrierRoutingModule { }
