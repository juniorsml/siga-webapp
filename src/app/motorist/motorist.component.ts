import { Component } from '@angular/core';
import { TabComponent } from '../shared/components/tabs/tab/tab.component';

@Component({
  selector: 'sga-motorist',
  templateUrl: './motorist.component.html',
  styles: []
})
export class MotoristComponent {
  motorists: any;
  mapHasFocus: boolean;
  selectedTabIndex: number;
  showAssociateModal: boolean;

  onTabSelected(tab: TabComponent) {
    switch (tab.index) {
      case 0:
        this.mapHasFocus = false;
        break;
      case 1:
        this.mapHasFocus = true;
        break;
    }
    this.selectedTabIndex = tab.index;
  }
}
