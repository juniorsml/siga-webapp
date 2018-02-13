import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { XHRBackend, RequestOptions } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { HttpService } from './shared/services/http.service';

import { httpFactory } from './shared/factory/http.factory';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/modules/shared.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
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
