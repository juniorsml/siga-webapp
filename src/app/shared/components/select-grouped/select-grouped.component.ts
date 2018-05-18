import { Component, Input } from '@angular/core';

@Component({
  selector: 'sga-select-grouped',
  templateUrl: './select-grouped.component.html',
  styles: []
})
export class SelectGroupedComponent {
  @Input() public data: Array<any>;
  @Input() public label: string;
}
