import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripComponent } from './trip.component';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    TripRoutingModule
  ],
  declarations: [TripComponent]
})
export class TripModule { }
