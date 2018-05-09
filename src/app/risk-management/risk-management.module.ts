import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DeviceModule } from '../device/device.module';
import { MotoristModule } from '../motorist/motorist.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { TruckModule } from '../truck/truck.module';

import { SharedModule } from '../shared/modules/shared.module';


@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,

    DeviceModule,
    MotoristModule,
    VehicleModule,
    TruckModule
  ],
  declarations: [
     

  ]
})
export class RiskManagement { }
