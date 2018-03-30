import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'motorist',
        loadChildren: 'app/motorist/motorist.module#MotoristModule'
      },
      {
        path: 'trip',
        loadChildren: 'app/trip/trip.module#TripModule'
      }
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
