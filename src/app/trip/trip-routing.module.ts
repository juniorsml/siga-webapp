import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripComponent } from './trip.component';
import { DetailComponent } from './detail/detail.component';
import { PlacesComponent } from './places/places.component';
import { MotoristComponent } from './motorist/motorist.component';

const routes: Routes = [
  {
    path: '',
    component: TripComponent,
    children: [
      { path: 'detail', component: DetailComponent },
      { path: 'places', component: PlacesComponent },
      { path: 'motorist', component: MotoristComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule {}
