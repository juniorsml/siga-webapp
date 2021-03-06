import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/modules/shared.module';
import { MotoristRoutingModule } from './motorist-routing.module';

import { MapService } from '../shared/services/map.service';
import { DomHandler } from './dom-handler/domhandler.service';

import { Map } from '../shared/models/Map';

import { MapMotoristComponent } from './map-motorist/map-motorist.component';
import { GridMotoristComponent } from './grid-motorist/grid-motorist.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { MotoristAssociateDialogComponent } from './associate-dialog/motorist-associate-dialog.component';
import { RegisterMotoristComponent } from './register-motorist/register-motorist.component';
import { NgSlimScrollModule } from 'ngx-slimscroll';
import { HistoryMotoristComponent } from './history-motorist/history-motorist.component';
import { HistoryDetailComponent } from './history-motorist/history-detail/history-detail.component';



@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    MotoristRoutingModule,
    NgSlimScrollModule
  ],
  declarations: [
    MapMotoristComponent,
    GridMotoristComponent,
    ProfileDialogComponent,
    MotoristAssociateDialogComponent,
    RegisterMotoristComponent,
    HistoryMotoristComponent,
    HistoryDetailComponent
  ],
  exports: [
    MotoristAssociateDialogComponent,
    RegisterMotoristComponent
  ],
  providers: [
    DomHandler,
    {
      provide: Map,
      useClass: MapService
    }
  ]
})
export class MotoristModule { }


