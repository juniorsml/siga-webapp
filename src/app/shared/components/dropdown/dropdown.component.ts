import { Component } from '@angular/core';
import { DropdownBodyComponent } from './dropdown-body/dropdown-body.component';
import { DropdownHeaderComponent } from './dropdown-header/dropdown-header.component';

@Component({
  selector: 'sga-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  public body: DropdownBodyComponent;
  public header: DropdownHeaderComponent;
  public menuOpen = false;

  constructor() {}

  onHeaderClick() {
    this.menuOpen = !this.menuOpen;
  }

  setHeader(header: DropdownHeaderComponent) {
    this.header = header;
  }

  setBody(body: DropdownBodyComponent) {
    this.body = body;
  }
}
