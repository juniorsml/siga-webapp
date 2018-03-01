import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sga-motorist-associate-dialog',
  templateUrl: './motorist-associate-dialog.component.html',
  styles: []
})
export class MotoristAssociateDialogComponent implements OnInit {
  hideAdminErrorModal: false;
  @Input() showDialog: boolean;
  @Input() motorists: any;

  currentList: any;

  constructor() { }

  ngOnInit() {
  }

  addList() {

  }

  removeList() {

  }

  searchText() {

  }

  applyChanges() {
    
  }

}
