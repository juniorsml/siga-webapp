import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { StartedTripsComponent } from './started/started.component';
import { ScheduledTripsComponent } from './scheduled/scheduled.component';
import { CTOTripsComponent } from './cto/cto.component';
import { RATCTripsComponent } from './ratc/ratc.component';
import { RadarComponent } from './radar/radar.component';



import { trips } from '../shared/mocks/trips';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskManagementRoutingModule {}
