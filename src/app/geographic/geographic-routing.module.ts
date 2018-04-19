import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapAreaComponent } from './area/map-area/map-area.component';
import { GridAreaComponent } from './area/grid-area/grid-area.component';
import { RegisterAreaComponent } from './area/register-area/register-area.component';

import { MapPointComponent } from './point/map-point/map-point.component';
import { GridPointComponent } from './point/grid-point/grid-point.component';
import { RegisterPointComponent } from './point/register-point/register-point.component';

const routes: Routes = [
  {
    path: 'area',
    children: [
      { path: 'map', component: MapAreaComponent},
      { path: 'grid', component: GridAreaComponent },
      { path: 'register', component: RegisterAreaComponent }
    ],
  },

  {
    path: 'point',
    children: [
      { path: 'map', component: MapPointComponent},
      { path: 'grid', component: GridPointComponent },
      { path: 'register', component: RegisterPointComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeographicRoutingModule {}
