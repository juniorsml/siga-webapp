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
import { SummaryComponent } from './summary-dialog/summary/summary.component';
import { SummaryRegisterComponent } from './register/summary/summary-register.component';
import { SummaryMotoristComponent } from './summary-dialog/motorist/summary-motorist.component';
import { SummaryVehicleComponent } from './summary-dialog/vehicle/summary-vehicle.component';
import { SummaryItineraryComponent } from './summary-dialog/itinerary/summary-itinerary.component';

import { CommandsHistoricComponent } from './summary-dialog/commands-historic/commands-historic.component';

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

    SummaryDialogComponent,
    SummaryComponent,
    SummaryRegisterComponent,
    SummaryMotoristComponent,
    SummaryVehicleComponent,
    SummaryItineraryComponent,
    CommandsHistoricComponent
 ]
})
export class TripModule { }
