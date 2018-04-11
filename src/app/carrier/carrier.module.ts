import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarrierRoutingModule } from './carrier-routing.module';
import { GridCarrierComponent } from './grid-carrier/grid-carrier.component';
import { MapCarrierComponent } from './map-carrier/map-carrier.component';

@NgModule({
  imports: [
    CommonModule,
    CarrierRoutingModule
  ],
  declarations: [GridCarrierComponent, MapCarrierComponent]
})
export class CarrierModule { }
