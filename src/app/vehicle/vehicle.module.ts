import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { MapVehicleComponent } from './map-vehicle/map-vehicle.component';
import { GridVehicleComponent } from './grid-vehicle/grid-vehicle.component';

@NgModule({
  imports: [
    CommonModule,
    VehicleRoutingModule
  ],
  declarations: [MapVehicleComponent, GridVehicleComponent]
})
export class VehicleModule { }
