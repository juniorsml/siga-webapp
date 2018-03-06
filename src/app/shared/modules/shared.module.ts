import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabComponent } from '../components/tabs/tab/tab.component';
import { TabsComponent } from '../components/tabs/tabs.component';
import { ModalComponent } from '../modal/modal.component';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { DropdownBodyComponent } from '../components/dropdown/dropdown-body/dropdown-body.component';
import { DropdownHeaderComponent } from '../components/dropdown/dropdown-header/dropdown-header.component';
import { AccordionComponent } from '../layout/sidebar/accordion/accordion.component';
import { AccordionHeaderComponent } from '../layout/sidebar/accordion/accordion.component';

import { AuthService } from '../services/auth.service';
import { GridComponent } from '../components/grid/grid.component';
import { MapFilterComponent } from '../components/map-filter/map-filter.component';
import { FormsModule } from '@angular/forms';

import { SearchPipe } from '../filters/search.pipe';
import { PlacesPipe } from '../filters/places.pipe';
import { 
  ColumnComponent,
  MenuItemComponent,
  DataTableComponent,
  EmptyTableComponent,
  ContextMenuComponent
} from '../components/table/table.component';

@NgModule({
  declarations: [
    PlacesPipe,
    SearchPipe,
    TabComponent,
    GridComponent,
    TabsComponent,
    ModalComponent,
    DropdownComponent,
    MapFilterComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent,
    AccordionComponent,
    AccordionHeaderComponent,

    ColumnComponent,
    MenuItemComponent,
    DataTableComponent,
    EmptyTableComponent,
    ContextMenuComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    PlacesPipe,
    SearchPipe,
    TabComponent,
    GridComponent,
    TabsComponent,
    ModalComponent,
    DropdownComponent,
    MapFilterComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent,
    AccordionComponent,
    AccordionHeaderComponent,
    
    ColumnComponent,
    MenuItemComponent,
    DataTableComponent,
    EmptyTableComponent,
    ContextMenuComponent
  ]
})
export class SharedModule { }
