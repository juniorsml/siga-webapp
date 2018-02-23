import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabComponent } from '../components/tabs/tab/tab.component';
import { TabsComponent } from '../components/tabs/tabs.component';
import { ModalComponent } from '../modal/modal.component';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { DropdownBodyComponent } from '../components/dropdown/dropdown-body/dropdown-body.component';
import { DropdownHeaderComponent } from '../components/dropdown/dropdown-header/dropdown-header.component';

import { AuthService } from '../services/auth.service';
import { GridComponent } from '../components/grid/grid.component';
import { MapFilterComponent } from '../components/map-filter/map-filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TabComponent,
    GridComponent,
    TabsComponent,
    ModalComponent,
    DropdownComponent,
    MapFilterComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    TabComponent,
    GridComponent,
    TabsComponent,
    ModalComponent,
    DropdownComponent,
    MapFilterComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent
  ]
})
export class SharedModule { }
