import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DeviceModule } from '../device/device.module';
import { MotoristModule } from '../motorist/motorist.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { TruckModule } from '../truck/truck.module';

import { SharedModule } from '../shared/modules/shared.module';
import { TripRoutingModule } from './trip-routing.module';


import { RegisterTripComponent } from './register-trip/register-trip.component';
import { DetailComponent } from './register-trip/detail/detail.component';
import { DeviceComponent } from './register-trip/device/device.component';
import { PlacesComponent } from './register-trip/places/places.component';
import { MotoristComponent } from './register-trip/motorist/motorist.component';
import { VehiclesComponent } from './register-trip/vehicles/vehicles.component';
import { TrucksComponent } from './register-trip/trucks/trucks.component';
import { StartedTripsComponent } from './started-trips/started.component';


@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,

    DeviceModule,
    MotoristModule,
    VehicleModule,
    TruckModule,

    TripRoutingModule
  ],
  declarations: [
      RegisterTripComponent, 
      DetailComponent, 
      PlacesComponent, 
      MotoristComponent, 
      VehiclesComponent, 
      DeviceComponent,
      TrucksComponent,
      StartedTripsComponent
  ]
})
export class TripModule { }
