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
import { SpinnerComponent } from '../components/spinner/spinner.component';


import { AuthService } from '../services/auth.service';
import { GridComponent } from '../components/grid/grid.component';
import { MapFilterComponent } from '../components/map-filter/map-filter.component';
import { FormsModule } from '@angular/forms';

import { SearchPipe } from '../filters/search.pipe';
import { PagerPipe } from '../filters/pager.pipe';
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
import {
  ListViewComponent,
  ListViewItemComponent,
  ListViewEmptyComponent
} from '../components/listview/listview.component';
import { PlacesAutoCompleteComponent } from '../components/places-auto-complete/places-auto-complete.component';
// import { StepperComponent } from '../components/stepper/stepper.component';

import { CalendarModule } from 'primeng/calendar';
import { TextMaskModule } from 'angular2-text-mask';

import { StepComponent } from '../components/steppers/stepper/step.component';
import { StepsComponent } from '../components/steppers/steps.component';
import { StepperComponent } from '../components/stepper/stepper.component';

import { PagerComponent } from '../components/pager/pager.component';

import { SidebarConfigurationComponent } from '../components/sidebar-configuration/sidebar-configuration.component';

@NgModule({
  declarations: [
    PlacesPipe,
    SearchPipe,
    PagerPipe,
    TimeElapsedAsTextPipe,

    StepComponent,
    StepsComponent,
    StepperComponent,

    TabComponent,
    GridComponent,
    TabsComponent,
    ModalComponent,

    DropdownComponent,
    MapFilterComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent,

    AutoCompleteComponent,

    ListViewComponent,
    ListViewItemComponent,
    ListViewEmptyComponent,

    AccordionComponent,
    AccordionHeaderComponent,

    PlacesAutoCompleteComponent,

    ColumnComponent,
    MenuItemComponent,
    DataTableComponent,
    EmptyTableComponent,
    ContextMenuComponent,

    SidebarConfigurationComponent,

    PagerComponent,

    SpinnerComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSlimScrollModule,
    CalendarModule,
    TextMaskModule
  ],
  providers: [
    AuthService,
    {
      provide: SLIMSCROLL_DEFAULTS,
      useValue: {
        alwaysVisible: false
      }
    }
  ],
  exports: [
    PlacesPipe,
    SearchPipe,
    PagerPipe,
    TimeElapsedAsTextPipe,

    TabComponent,
    GridComponent,
    TabsComponent,
    ModalComponent,

    StepComponent,
    StepsComponent,
    StepperComponent,

    DropdownComponent,
    MapFilterComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent,

    AutoCompleteComponent,

    ListViewComponent,
    ListViewItemComponent,
    ListViewEmptyComponent,

    AccordionComponent,
    AccordionHeaderComponent,

    PlacesAutoCompleteComponent,

    ColumnComponent,
    MenuItemComponent,
    DataTableComponent,
    EmptyTableComponent,
    ContextMenuComponent,
    CalendarModule,
    TextMaskModule,

    SidebarConfigurationComponent,
    PagerComponent,

    SpinnerComponent
  ]
})
export class SharedModule {}
