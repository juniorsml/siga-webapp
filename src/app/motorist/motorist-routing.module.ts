import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotoristComponent } from './motorist.component';
import { RegisterMotoristComponent } from './register-motorist/register-motorist.component';

const routes: Routes = [
  	{ path: '', component: MotoristComponent },
	{ path: 'register', component: RegisterMotoristComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotoristRoutingModule { }


