import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaComponent } from './area/area.component';
import { EntityComponent } from './entity/entity.component';
import { PointComponent } from './point/point.component';

const routes: Routes = [
  { path: 'area', component: AreaComponent },
  { path: 'point', component: PointComponent },
  { path: 'entity', component: EntityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeographicRoutingModule {}
