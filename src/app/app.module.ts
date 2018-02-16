import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { XHRBackend, RequestOptions } from '@angular/http';

import { SharedModule } from './shared/modules/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { HttpService } from './shared/services/http.service';

import { httpFactory } from './shared/factory/http.factory';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { ContentComponent } from './shared/layout/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
  ],
  imports: [
    FormsModule,
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
