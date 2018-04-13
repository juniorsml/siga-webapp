import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DeviceModule } from '../device/device.module';
import { MotoristModule } from '../motorist/motorist.module';

import { SharedModule } from '../shared/modules/shared.module';
import { TripRoutingModule } from './trip-routing.module';

import { TripComponent } from './trip.component';
import { DetailComponent } from './detail/detail.component';
import { DeviceComponent } from './device/device.component';
import { PlacesComponent } from './places/places.component';
import { MotoristComponent } from './motorist/motorist.component';
import { VehiclesComponent } from './vehicles/vehicles.component';


@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,

    DeviceModule,
    MotoristModule,

    TripRoutingModule
  ],
  declarations: [TripComponent, DetailComponent, PlacesComponent, MotoristComponent, VehiclesComponent, DeviceComponent]
})
export class TripModule { }
