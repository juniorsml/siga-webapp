import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-motorist-associate-dialog',
  templateUrl: './motorist-associate-dialog.component.html',
  styleUrls: ['./motorist-associate-dialog.component.scss']
})
export class MotoristAssociateDialogComponent implements OnInit {
  @Input() 
  public showDialog: boolean;

  @Input()
  get motorists(): Array<any> {
    return this._motorists;
  }
  set motorists(motorists: Array<any>) {
    this._motorists = motorists;
    this.setCurrentMotorists();
  }

  private _motorists: Array<any> = [];

  public selectedMotorist: any;
  public showMotoristDialog = false;
  public showMotoristRegister = false;

  public addList: Array<any> = [];
  public removeList: Array<any> = [];
  public currentList: Array<any> = [];

  public searchText: any;
  public hideAdminErrorModal = true;

  constructor(private router: ActivatedRoute) {}

  ngOnInit() :void {
    this.router.data.subscribe(data => this.motorists = data.motorists);
  }

  private setCurrentMotorists() {
    this.currentList = [];
    this.motorists.map(motorist => {
      if (!this.motoristIsDuplicate(motorist.id)) this.currentList.push(motorist);
    });
  }

  private motoristIsDuplicate(motoristId): boolean {
    return this.removeList.find(m => m.id == motoristId);
  }

  public onMotoristSelected(motorist) {
    this.addList.push(motorist);
  }

  public showMotoristModal(id) {
    this.showMotoristDialog = true;
    this.selectedMotorist = this.motorists.filter(m => m.id === id)[0];
  }

  public motoristDialogClose() {
    this.showMotoristDialog = false;
  }

  public undoAddMotorist(motorist) {
    this.removeFromList(this.addList, motorist);
  }

  public deleteMotorist(motorist) {
    this.removeFromList(this.currentList, motorist);
    this.removeList.push(motorist);
  }

  public undoRemoveMotorist(motorist) {
    this.removeFromList(this.removeList, motorist);
    this.currentList.unshift(motorist);
  }

  public showMotoristForm(suggestion) {
    suggestion;
    this.showMotoristRegister = true;
  }

  public motoristFormClose() {
    this.showMotoristRegister = false;
  }

  private removeFromList(list, motorist) {
    const indexToRemove = list.findIndex(m => m.id === motorist.id);
    list.splice(indexToRemove, 1);
  }

  onAdminMotoristCellClick(event) {
    if (event.cellIndex === 6) this.deleteMotorist(event.data);
  }

  applyChanges() {}
}
