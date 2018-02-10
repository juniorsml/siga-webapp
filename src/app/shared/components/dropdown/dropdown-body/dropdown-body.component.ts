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
  selector: 'sga-dropdown-body',
  templateUrl: './dropdown-body.component.html',
  styles: []
})
export class DropdownBodyComponent implements OnInit {
  @ContentChild(TemplateRef) public template: TemplateRef<any>;

  constructor(
    @Inject(forwardRef(() => DropdownComponent))
    public dropdownComponent: DropdownComponent
  ) {
    dropdownComponent.setBody(this);
  }

  ngOnInit() {}
}
