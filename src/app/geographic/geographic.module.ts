import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeographicRoutingModule } from './geographic-routing.module';
import { EntityComponent } from './entity/entity.component';
import { PointComponent } from './point/point.component';
import { AreaComponent } from './area/area.component';

@NgModule({
  imports: [
    CommonModule,
    GeographicRoutingModule
  ],
  declarations: [EntityComponent, PointComponent, AreaComponent]
})
export class GeographicModule { }
