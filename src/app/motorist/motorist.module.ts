import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MotoristRoutingModule } from './motorist-routing.module';
import { MotoristComponent } from './motorist.component';
import { SharedModule } from '../shared/modules/shared.module';
// import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { MotoristAssociateDialogComponent } from './associate-dialog/motorist-associate-dialog.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    MotoristRoutingModule
  ],
  declarations: [
    MotoristComponent, 
    // ProfileDialogComponent, 
    MotoristAssociateDialogComponent
  ]
})
export class MotoristModule { }
