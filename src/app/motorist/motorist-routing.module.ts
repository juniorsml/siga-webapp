import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapMotoristComponent } from './map-motorist/map-motorist.component';
import { GridMotoristComponent } from './grid-motorist/grid-motorist.component';
import { MotoristAssociateDialogComponent } from './associate-dialog/motorist-associate-dialog.component';

import { HistoryMotoristComponent } from './history-motorist/history-motorist.component';

const routes: Routes = [
  { path: 'map', component: MapMotoristComponent },
  { path: 'grid', component: GridMotoristComponent },
  { path: 'account', component: MotoristAssociateDialogComponent },
  { path: 'history', component: HistoryMotoristComponent },
  { path: 'history/:id', component: HistoryMotoristComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotoristRoutingModule {}
