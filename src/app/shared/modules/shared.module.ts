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

@NgModule({
  declarations: [
    TabComponent,
    TabsComponent,
    ModalComponent,
    DropdownComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent,
    AccordionComponent,
    AccordionHeaderComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    TabComponent,
    TabsComponent,
    ModalComponent,
    DropdownComponent,
    DropdownBodyComponent,
    DropdownHeaderComponent,
    AccordionComponent,
    AccordionHeaderComponent,
  ]
})
export class SharedModule { }
