import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruckRoutingModule } from './truck-routing.module';
import { GridTruckComponent } from './grid-truck/grid-truck.component';
import { MapTruckComponent } from './map-truck/map-truck.component';

@NgModule({
  imports: [
    CommonModule,
    TruckRoutingModule
  ],
  declarations: [GridTruckComponent, MapTruckComponent]
})
export class TruckModule { }
