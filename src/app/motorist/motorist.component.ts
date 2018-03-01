import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sga-motorist',
  templateUrl: './motorist.component.html',
  styles: []
})
export class MotoristComponent implements OnInit {
  motorists: any;
  onTabSelected: any;
  selectedTabIndex: any;
  showAssociateModal: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
