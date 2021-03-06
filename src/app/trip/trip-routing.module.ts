import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterTripComponent } from './register/register-trip.component';

import { StartedTripsComponent } from './started/started.component';
import { ScheduledTripsComponent } from './scheduled/scheduled.component';
import { HistoricTripsComponent } from './historic/historic.component';

import { DetailComponent } from './register/detail/detail.component';
import { PlacesComponent } from './register/places/places.component';
import { MotoristComponent } from './register/motorist/motorist.component';
import { VehiclesComponent } from './register/vehicles/vehicles.component';
import { TrucksComponent } from './register/trucks/trucks.component';
import { DeviceComponent } from './register/device/device.component';

import { SummaryRegisterComponent } from './register/summary/summary-register.component';

import { motorists } from '../shared/mocks/motorist';
import { vehicles } from '../shared/mocks/vehicles';
import { devices } from '../shared/mocks/device';
import { trips } from '../shared/mocks/trips';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterTripComponent,
    children: [
      { path: 'detail', component: DetailComponent },
      { path: 'places', component: PlacesComponent },
      { path: 'motorist', component: MotoristComponent, data: { motorists } },
      { path: 'vehicles', component: VehiclesComponent, data: { vehicles } },
      { path: 'trucks', component: TrucksComponent, data: { vehicles } },
      { path: 'device', component: DeviceComponent, data: { devices } },
      { path: 'summary', component: SummaryRegisterComponent },
    ]
  },
  {
    path: 'started',
    component: StartedTripsComponent,
    data: { trips }
  },
  {
    path: 'scheduled',
    component: ScheduledTripsComponent,
    data: { trips }
  },
  {
    path: 'historic',
    component: HistoricTripsComponent,
    data: { trips }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
