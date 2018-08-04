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

import { TagInputModule } from 'ngx-chips';
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
import { OptionComponent } from '../components/sidebar-configuration/option/option.component';


import { PageNotFoundComponent } from '../layout/404page/not-found.component';
import { ColumnSelectorComponent } from '../components/column-selector/column-selector.component';
import { MapComponent } from '../components/map/map.component';
import { SelectGroupedComponent } from '../components/select-grouped/select-grouped.component';
import { DirectionService } from '../services/direction.service';
import { HttpModule } from '@angular/http';
import { RouteInfoComponent } from '../components/route-info/route-info.component';

@NgModule({
  declarations: [
    PlacesPipe,
    SearchPipe,
    PagerPipe,
    TimeElapsedAsTextPipe,

    MapComponent,

    StepComponent,
    StepsComponent,
    StepperComponent,

    TabComponent,
    GridComponent,
    TabsComponent,
    ModalComponent,

    RouteInfoComponent,

    SelectGroupedComponent,

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
    ColumnSelectorComponent,

    SidebarConfigurationComponent,
    OptionComponent,

    PagerComponent,
    PageNotFoundComponent,

    SpinnerComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    TagInputModule,
    NgSlimScrollModule,
    CalendarModule,
    TextMaskModule
  ],
  providers: [
    AuthService,
    DirectionService,
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

    PageNotFoundComponent,

    TabComponent,
    GridComponent,
    TabsComponent,
    ModalComponent,

    MapComponent,

    StepComponent,
    StepsComponent,
    StepperComponent,

    RouteInfoComponent,

    SelectGroupedComponent,

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
    ColumnSelectorComponent,

    CalendarModule,
    TextMaskModule,

    SidebarConfigurationComponent,
    OptionComponent,
    PagerComponent,

    SpinnerComponent,

    TagInputModule,
    NgSlimScrollModule
  ]
})
export class SharedModule {}
