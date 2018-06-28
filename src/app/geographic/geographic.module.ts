import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/modules/shared.module';
import { GeographicRoutingModule } from './geographic-routing.module';

import { Map } from '../shared/models/Map';
import { MapService } from '../shared/services/map.service';

import { GridAreaComponent } from './area/grid-area/grid-area.component';
import { RegisterAreaComponent } from './area/register-area/register-area.component';
import { MapAreaComponent } from './area/map-area/map-area.component';
import { GridPointComponent } from './point/grid-point/grid-point.component';
import { RegisterPointComponent } from './point/register-point/register-point.component';
import { MapPointComponent } from './point/map-point/map-point.component';
import { RegisterPlaceComponent } from './places/places.component';
import { RegisterComponent } from './places/register/register.component';
import { GridControlComponent } from './places/grid-control/grid-control.component';
import { RegisterGroupComponent } from './places/register-group/register-group.component';
import { ModalGroupComponent } from './places/modal-group/modal-group.component';
import { HttpService } from '../shared/services/http.service';
import { httpFactory } from '../shared/factory/http.factory';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { Router } from '@angular/router';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    SharedModule,
    GeographicRoutingModule
  ],
  providers: [
    {
      provide: HttpService,
      useFactory: httpFactory,
      deps: [
        XHRBackend,
        RequestOptions,
        Router
      ]
    },
    {
      provide: Map,
      useClass: MapService
    }
  ],
  declarations: [GridAreaComponent, RegisterAreaComponent, MapAreaComponent, GridPointComponent, RegisterPointComponent, MapPointComponent, RegisterPlaceComponent, RegisterComponent, GridControlComponent, RegisterGroupComponent, ModalGroupComponent]
})
export class GeographicModule { }
