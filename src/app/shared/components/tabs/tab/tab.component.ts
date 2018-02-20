import { 
  Component, 
  Input 
} from '@angular/core';

import { TabsComponent } from '../tabs.component';

@Component({
  selector: 'sga-tab',
  templateUrl: './tab.component.html'
})
export class TabComponent {
  @Input('iconClass')
  iconClass: string;
  @Input('styleClass')
  styleClass: string;
  @Input() heading: string;
  index: number;
  active = this.active || false;

  constructor(public tabsComponent: TabsComponent) {
      tabsComponent.addTab(this);
      if (this.styleClass == null) {
          this.styleClass = "tab";
      }
  }
}
