import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownComponent } from '../components/dropdown/dropdown.component';

@NgModule({
  declarations: [DropdownComponent],
  imports: [
    BrowserModule
  ],
  exports: [
    BrowserModule,

    DropdownComponent
  ]
})
export class SharedModule { }
