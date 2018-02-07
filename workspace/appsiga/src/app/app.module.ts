import { XHRBackend, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { HttpService } from './shared/services/http.service';

import { httpFactory } from './shared/factory/http.factory';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/modules/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HttpService,
      useFactory: httpFactory,
      deps: [
        XHRBackend,
        RequestOptions,
        Router
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
