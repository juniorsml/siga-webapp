import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sga-motorist-associate-dialog',
  templateUrl: './motorist-associate-dialog.component.html',
  styleUrls: ['./motorist-associate-dialog.component.scss']
})
export class MotoristAssociateDialogComponent implements OnInit {
  @Input() showDialog: boolean;
  @Input()
  get motorists(): Array<any> {
    return this._motorists;
  }
  set motorists(motorists: Array<any>) {
    this._motorists = motorists;
    this.setCurrentMotorists();
  }

  private _motorists: Array<any> = [];

  public removeList: Array<any> = [];
  public currentList: Array<any> = [];
  public hideAdminErrorModal: false;
  public searchText: any;

  constructor() {}

  setCurrentMotorists() {
    this.currentList = [];
    this.motorists.map(motorist => {
      if (!this.motoristIsDuplicate(motorist.id)) this.currentList.push(motorist)
    });
  }

  motoristIsDuplicate(motoristId): boolean {
    return this.removeList.find(m => m.id == motoristId);
  }

  ngOnInit() {}

  addList() {}

  applyChanges() {}
}
