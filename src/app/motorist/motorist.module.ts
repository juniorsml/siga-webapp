import { NgModule } from '@angular/core';

import { MotoristRoutingModule } from './motorist-routing.module';
import { MotoristComponent } from './motorist.component';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MotoristRoutingModule
  ],
  declarations: [MotoristComponent]
})
export class MotoristModule { }
