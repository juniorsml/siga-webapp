import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapMotoristComponent } from './map-motorist/map-motorist.component';
import { GridMotoristComponent } from './grid-motorist/grid-motorist.component';
import { MotoristAssociateDialogComponent } from './associate-dialog/motorist-associate-dialog.component';

import { motorists } from '../shared/mocks/motorist';
import { HistoryMotoristComponent } from './history-motorist/history-motorist.component';

const routes: Routes = [
  { path: 'map', component: MapMotoristComponent, data: { motorists: motorists } },
  { path: 'grid', component: GridMotoristComponent, data: { motorists } },
  { path: 'account', component: MotoristAssociateDialogComponent, data: { motorists } },
  { path: 'history/:id', component: HistoryMotoristComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotoristRoutingModule {}
