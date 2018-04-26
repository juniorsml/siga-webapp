import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterTripComponent } from './register-trip/register-trip.component';


import { DetailComponent } from './register-trip/detail/detail.component';
import { PlacesComponent } from './register-trip/places/places.component';
import { MotoristComponent } from './register-trip/motorist/motorist.component';
import { VehiclesComponent } from './register-trip/vehicles/vehicles.component';
import { TrucksComponent } from './register-trip/trucks/trucks.component';
import { DeviceComponent } from './register-trip/device/device.component';
import { StartedTripsComponent } from './started-trips/started.component';
import { devices } from '../shared/mocks/device';
import { vehicles } from '../shared/mocks/vehicles';
import { trips } from '../shared/mocks/trips';


const routes: Routes = [
  { 
    path: 'register-trip', 
    component: RegisterTripComponent,
    children: [  
      { path: 'detail', component: DetailComponent },
      { path: 'places', component: PlacesComponent },
      { path: 'motorist', component: MotoristComponent },
      { path: 'vehicles', component: VehiclesComponent,  data: { vehicles }  },
      { path: 'trucks', component: TrucksComponent, data: { vehicles }  },
      { path: 'device', component: DeviceComponent, data: { devices } }
    ]
  },
  { 
    path: 'started-trips', 
    component: StartedTripsComponent,
    data: { trips }
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule {}
