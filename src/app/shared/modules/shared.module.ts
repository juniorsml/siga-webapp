import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { DropdownBodyComponent } from '../components/dropdown/dropdown-body/dropdown-body.component';
import { DropdownHeaderComponent } from '../components/dropdown/dropdown-header/dropdown-header.component';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent
  ]
})
export class SharedModule { }
