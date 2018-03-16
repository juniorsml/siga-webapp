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
import { NgSlimScrollModule, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { 
  ColumnComponent,
  MenuItemComponent,
  DataTableComponent,
  EmptyTableComponent,
  ContextMenuComponent
} from '../components/table/table.component';
import { TimeElapsedAsTextPipe } from '../filters/time-elapsed.pipe';
import { AutoCompleteComponent } from '../components/auto-complete/auto-complete.component';

@NgModule({
  declarations: [
    PlacesPipe,
    SearchPipe,
    TimeElapsedAsTextPipe,

    TabComponent,
    GridComponent,
    TabsComponent,
    ModalComponent,
    DropdownComponent,
    MapFilterComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent,

    AutoCompleteComponent,

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
    CommonModule,
    NgSlimScrollModule
  ],
  providers: [
    AuthService,
    {
      provide: SLIMSCROLL_DEFAULTS,
      useValue: {
        alwaysVisible : false
      }
    }
  ],
  exports: [
    PlacesPipe,
    SearchPipe,
    TimeElapsedAsTextPipe,

    TabComponent,
    GridComponent,
    TabsComponent,
    ModalComponent,
    DropdownComponent,
    MapFilterComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent,

    AutoCompleteComponent,

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
