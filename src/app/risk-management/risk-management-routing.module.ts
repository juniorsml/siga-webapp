import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { StartedTripsComponent } from './monitoring/started/started.component';
import { ScheduledTripsComponent } from './monitoring/scheduled/scheduled.component';
import { CTOTripsComponent } from './monitoring/cto/cto.component';
import { RATCTripsComponent } from './monitoring/ratc/ratc.component';
import { RadarComponent } from './monitoring/radar/radar.component';

import { GridOperationComponent } from './configuration/operation/grid/grid-operation.component';


import { trips } from '../shared/mocks/trips';

import { operations } from '../shared/mocks/operations';

const routes: Routes = [
  { 
    path: 'started', 
    component: StartedTripsComponent,
    data: { trips }
  },
  { 
    path: 'schedule', 
    component: ScheduledTripsComponent,
    data: { trips }
  },
  { 
    path: 'cto', 
    component: CTOTripsComponent,
    data: { trips }
  },
  { 
    path: 'ratc', 
    component: RATCTripsComponent,
    data: { trips }
  },
  { 
    path: 'radar', 
    component: RadarComponent,
    data: { trips }
  }
  ,
  { 
    path: 'operation', 
    component: GridOperationComponent,
    data: { operations }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskManagementRoutingModule {}
