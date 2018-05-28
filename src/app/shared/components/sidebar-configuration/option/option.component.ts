import { Component, Input } from '@angular/core';
import { SidebarConfigurationComponent } from '../sidebar-configuration.component';

@Component({
  selector: 'sga-option',
  template: ``
})
export class OptionComponent {
  @Input() public header: string;
  @Input() public icon: string;

  constructor(public SidebarConfigurationComponent: SidebarConfigurationComponent) {
    SidebarConfigurationComponent.addOption(this);
  }
}
