import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TruckRoutingModule } from './truck-routing.module';
import { GridTruckComponent } from './grid-truck/grid-truck.component';
import { MapTruckComponent } from './map-truck/map-truck.component';

import { DialogVehicleComponent } from '../vehicle/dialog-vehicle/dialog-vehicle.component';

import { SharedModule } from '../shared/modules/shared.module';

import { NgSlimScrollModule } from 'ngx-slimscroll';


import { MapService } from '../shared/services/map.service';
import { DomHandler } from '../shared/dom-handler/domhandler.service';

import { Map } from '../shared/models/Map';

@NgModule({
  imports: [ 
    CommonModule,
    TruckRoutingModule,
    SharedModule,
    FormsModule,
    NgSlimScrollModule,
  ],
  declarations: [
	  GridTruckComponent, 
	  MapTruckComponent,
	  DialogVehicleComponent
	  
  ],
  providers: [
    DomHandler,
    {
      provide: Map,
      useClass: MapService
    }
  ]
})
export class TruckModule { }
