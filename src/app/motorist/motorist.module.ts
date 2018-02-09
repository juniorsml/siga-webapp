import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotoristRoutingModule } from './motorist-routing.module';
import { MotoristComponent } from './motorist.component';

@NgModule({
  imports: [
    CommonModule,
    MotoristRoutingModule
  ],
  declarations: [MotoristComponent]
})
export class MotoristModule { }
