import { Component, Output, EventEmitter } from '@angular/core';
import { OptionComponent } from './option/option.component';
import { OptionClickEvent } from '../../events/OptionClickEvent';

@Component({
  selector: 'sga-sidebar-configuration',
  templateUrl: './sidebar-configuration.component.html',
  styleUrls: ['./sidebar-configuration.component.scss']
})
export class SidebarConfigurationComponent {

  @Output()
  public onSelectOption = new EventEmitter<OptionClickEvent>();

  public options = new Array<OptionComponent>();

  public addOption(option: OptionComponent): void {
    if (option) this.options.push(option);
  }

  public onClick(event: Event, option: OptionComponent, index: number): void {
    this.onSelectOption.emit(new OptionClickEvent(event, option, index));
  }

  public status: boolean = false;
  toggleMenu() {
    this.status = !this.status;
  }
}


