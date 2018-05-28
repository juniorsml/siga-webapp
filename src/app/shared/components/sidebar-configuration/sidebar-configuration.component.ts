import { Component, Output, EventEmitter,ElementRef } from '@angular/core';
import { OptionComponent } from './option/option.component';
import { OptionClickEvent } from '../../events/OptionClickEvent';

@Component({
  selector: 'sga-sidebar-configuration',
  templateUrl: './sidebar-configuration.component.html',
  styleUrls: ['./sidebar-configuration.component.scss'],
  host: {
    '(document:click)': 'outClick($event)',
  }

})
export class SidebarConfigurationComponent {


  
  constructor(private _eref: ElementRef) { }

  @Output()
  public onSelectOption = new EventEmitter<OptionClickEvent>();

  public options = new Array<OptionComponent>();

  public addOption(option: OptionComponent): void {
    if (option) this.options.push(option);
  }

  public onClick(event: Event, option: OptionComponent, index: number): void {
    this.onSelectOption.emit(new OptionClickEvent(event, option, index));
    if (this.status != false) {
          this.status = false;
        }
  }

  public status: boolean = false;
  toggleMenu() {
    this.status = !this.status;
  }
  
   // Close When Click outSide of Component
   outClick(event) {
       if (!this._eref.nativeElement.contains(event.target)){// or some similar check
        if (this.status != false) {
          this.status = false;
        }
      }
    }
}


