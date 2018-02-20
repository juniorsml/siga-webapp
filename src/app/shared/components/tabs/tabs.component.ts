import { 
  Component, 
  Input, 
  Output,
  EventEmitter
} from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'sga-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: [ './tabs.component.scss' ]
})
export class TabsComponent {

  @Input() styleClass;
  @Output() tabSelected: EventEmitter<any> = new EventEmitter();
  @Output() tabChanged: EventEmitter<any> = new EventEmitter();
  tabs: TabComponent[];
  selectedTabIndex: number;
  previousTab: TabComponent;

  constructor() {
      this.tabs = [];
  }

  @Input()
  public set tabIndex(selectedIndex: number) {
      this.selectedTabIndex = selectedIndex;
      this.setActiveTab(this.selectedTabIndex);

      if (this.previousTab != null
          && this.previousTab.index != selectedIndex) {
          this.tabChanged.emit(this.tabs[selectedIndex]);
      }

      this.previousTab = this.tabs[selectedIndex];
  }

  selectTab(event, tab) {
      this.deactivateAllTabs();
      tab.active = true;

      if (this.previousTab != null
          && this.previousTab.index != tab.index) {
          this.tabChanged.emit(tab);
      }
      this.previousTab = tab;

      this.tabSelected.emit([event, tab]);
      this.tabSelected.emit(tab);
  }

  deactivateAllTabs() {
      this.tabs.forEach((tab) => tab.active = false);
  }

  setActiveTab(selectedIndex: number) {
      this.deactivateAllTabs();
      if (selectedIndex >= 0) {
          this.tabs[selectedIndex].active = true;
      }
  }

  addTab(tab: TabComponent) {
      if (this.tabs.length === 0) {
          tab.active = true;
          tab.index = 0;
      } else {
          tab.index = this.tabs.length;
      }
      this.tabs.push(tab);
  }
}
