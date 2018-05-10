import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { StartedTripsComponent } from './started/started.component';
import { ScheduledTripsComponent } from './schedule/schedule.component';


import { trips } from '../shared/mocks/trips';

const routes: Routes = [

  { 
    path: 'started', 
    component: StartedTripsComponent,
    data: { trips }
  }

  { 
    path: 'schedule', 
    component: ScheduledTripsComponent,
    data: { trips }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskManagementRoutingModule {}
