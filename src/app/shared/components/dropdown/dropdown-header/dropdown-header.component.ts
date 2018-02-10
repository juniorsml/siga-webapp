import {
  Component,
  OnInit,
  ContentChild,
  TemplateRef,
  Inject,
  forwardRef
} from '@angular/core';

import { DropdownComponent } from '../dropdown.component';

@Component({
  selector: 'sga-dropdown-header',
  templateUrl: './dropdown-header.component.html',
  styles: []
})
export class DropdownHeaderComponent implements OnInit {
  @ContentChild(TemplateRef) public template: TemplateRef<any>;

  constructor(
    @Inject(forwardRef(() => DropdownComponent))
    public dropdownComponent: DropdownComponent
  ) {
    dropdownComponent.setHeader(this);
  }

  ngOnInit() {}
}
