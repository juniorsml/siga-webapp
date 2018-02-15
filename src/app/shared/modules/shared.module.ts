import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { DropdownBodyComponent } from '../components/dropdown/dropdown-body/dropdown-body.component';
import { DropdownHeaderComponent } from '../components/dropdown/dropdown-header/dropdown-header.component';
import { TabsComponent } from '../components/tabs/tabs.component';
import { TabComponent } from '../components/tabs/tab/tab.component';

@NgModule({
  declarations: [
    TabComponent,
    TabsComponent,
    DropdownComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabComponent,
    TabsComponent,
    DropdownComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent
  ]
})
export class SharedModule { }
