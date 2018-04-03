import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripComponent } from './trip.component';
import { SharedModule } from '../shared/modules/shared.module';
import { DetailComponent } from './detail/detail.component';
import { PlacesComponent } from './places/places.component';
import { MotoristModule } from '../motorist/motorist.module';
import { MotoristComponent } from './motorist/motorist.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    MotoristModule,
    TripRoutingModule
  ],
  declarations: [TripComponent, DetailComponent, PlacesComponent, MotoristComponent]
})
export class TripModule { }
