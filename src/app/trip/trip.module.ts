import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DeviceModule } from '../device/device.module';
import { MotoristModule } from '../motorist/motorist.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { TruckModule } from '../truck/truck.module';

import { SharedModule } from '../shared/modules/shared.module';
import { TripRoutingModule } from './trip-routing.module';


import { RegisterTripComponent } from './register/register-trip.component';
import { DetailComponent } from './register/detail/detail.component';
import { DeviceComponent } from './register/device/device.component';
import { PlacesComponent } from './register/places/places.component';
import { MotoristComponent } from './register/motorist/motorist.component';
import { VehiclesComponent } from './register/vehicles/vehicles.component';
import { TrucksComponent } from './register/trucks/trucks.component';
import { StartedTripsComponent } from './started/started.component';
import { ScheduledTripsComponent } from './scheduled/scheduled.component';
import { HistoricTripsComponent } from './historic/historic.component';
import { SummaryDialogComponent } from './summary-dialog/summary-dialog.component';



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
      StartedTripsComponent,
      ScheduledTripsComponent,
      HistoricTripsComponent,
      SummaryDialogComponent
  ]
})
export class TripModule { }
