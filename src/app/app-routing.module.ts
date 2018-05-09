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
      },
      {
        path: 'carrier',
        loadChildren: 'app/carrier/carrier.module#CarrierModule'
      },
      {
        path: 'vehicle',
        loadChildren: 'app/vehicle/vehicle.module#VehicleModule'
      },
      {
        path: 'device',
        loadChildren: 'app/device/device.module#DeviceModule'
      },
      {
        path: 'truck',
        loadChildren: 'app/truck/truck.module#TruckModule'
      },
      {
        path: 'geographic',
        loadChildren: 'app/geographic/geographic.module#GeographicModule'
      },
      {
        path: 'risk-management',
        loadChildren: 'app/risk-management/risk-management.module#RiskManagementModule'
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
