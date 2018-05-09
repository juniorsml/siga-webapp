import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { StartedTripsComponent } from './started/started.component';


import { motorists } from '../shared/mocks/motorist';
import { vehicles } from '../shared/mocks/vehicles';
import { devices } from '../shared/mocks/device';
import { trips } from '../shared/mocks/trips';

const routes: Routes = [

  { 
    path: 'started', 
    component: StartedTripsComponent,
    data: { trips }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule {}
