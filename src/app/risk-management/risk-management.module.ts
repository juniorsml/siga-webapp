import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DeviceModule } from '../device/device.module';
import { MotoristModule } from '../motorist/motorist.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { TruckModule } from '../truck/truck.module';

import { RiskManagementRoutingModule } from './risk-management-routing.module';

import { SharedModule } from '../shared/modules/shared.module';

import { StartedTripsComponent } from './monitoring/started/started.component';

import { ScheduledTripsComponent } from './monitoring/scheduled/scheduled.component';

import { CTOTripsComponent } from './monitoring/cto/cto.component';

import { RATCTripsComponent } from './monitoring/ratc/ratc.component';

import { RadarComponent } from './monitoring/radar/radar.component';

import { GridOperationComponent } from './configuration/operation/grid/grid-operation.component';


@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,

    DeviceModule,
    MotoristModule,
    VehicleModule,
    TruckModule,
    RiskManagementRoutingModule
  ],
  declarations: [
     StartedTripsComponent,
     ScheduledTripsComponent,
     CTOTripsComponent,
     RATCTripsComponent,
     RadarComponent,
     GridOperationComponent

  ]
})
export class RiskManagementModule { }
