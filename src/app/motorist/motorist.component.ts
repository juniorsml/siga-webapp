import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sga-motorist',
  templateUrl: './motorist.component.html',
  styles: []
})
export class MotoristComponent implements OnInit {

  motorists: any;
  showAssociateModal: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
