import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripComponent } from './trip.component';
import { DetailComponent } from './detail/detail.component';
import { PlacesComponent } from './places/places.component';
import { MotoristComponent } from './motorist/motorist.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { TrucksComponent } from './trucks/trucks.component';
import { DeviceComponent } from './device/device.component';
import { devices } from '../shared/mocks/device';


const routes: Routes = [
  {
    path: '',
    component: TripComponent,
    children: [
      { path: 'detail', component: DetailComponent },
      { path: 'places', component: PlacesComponent },
      { path: 'motorist', component: MotoristComponent },
      { path: 'vehicles', component: VehiclesComponent },
      { path: 'trucks', component: TrucksComponent },
      { path: 'device', component: DeviceComponent, data: { devices } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule {}
