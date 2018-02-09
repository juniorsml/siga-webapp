import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sga-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  public menuOpen = false;
  
  constructor() { }

  ngOnInit() {
  }

  onHeaderClick() {

  }
}
