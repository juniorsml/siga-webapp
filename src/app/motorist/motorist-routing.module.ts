import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotoristComponent } from './motorist.component';

const routes: Routes = [
  { path: '', component: MotoristComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotoristRoutingModule { }
