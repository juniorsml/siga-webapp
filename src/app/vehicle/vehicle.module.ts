import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { MapVehicleComponent } from './map-vehicle/map-vehicle.component';
import { GridVehicleComponent } from './grid-vehicle/grid-vehicle.component';

import { DialogVehicleComponent } from './dialog-vehicle/dialog-vehicle.component';

import { MapService } from '../shared/services/map.service';
import { DomHandler } from './dom-handler/domhandler.service';

import { Map } from '../shared/models/Map';

import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VehicleRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [MapVehicleComponent, GridVehicleComponent,DialogVehicleComponent],
  providers: [
    DomHandler,
    {
      provide: Map,
      useClass: MapService
    }
  ]
})
export class VehicleModule { }
