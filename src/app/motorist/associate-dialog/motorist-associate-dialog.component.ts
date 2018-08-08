import { Component, OnInit } from '@angular/core';
import { MotoristService } from '../motorist.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sga-motorist-associate-dialog',
  templateUrl: './motorist-associate-dialog.component.html',
  styleUrls: ['./motorist-associate-dialog.component.scss'],
  providers: [MotoristService]
})
export class MotoristAssociateDialogComponent implements OnInit {
  public showDialog: boolean;

  public haveFooter = true;

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

  constructor(private motoristService: MotoristService) { }

  ngOnInit(): void {
    this.getMotorists();
  }

  private getMotorists() {
    this
      .motoristService
      .getMotorists()
      .subscribe(
        data => this.onSuccess(data),
        error => alert(error));
  }

  private onSuccess(data) {
    this.motorists = data;
  }

  private setCurrentMotorists() {
    this.currentList = [];
    this.motorists.map(motorist => {
      if (!this.motoristIsDuplicate(motorist.id)) { this.currentList.push(motorist); }
    });
  }

  private motoristIsDuplicate(motoristId): boolean {
    return this.removeList.find(m => m.id === motoristId);
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

  public showMotoristForm() {
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
    if (event.cellIndex === 6) { this.deleteMotorist(event.data); }
  }

  applyChanges() {
    const addIds = this.addList.map(motorist => motorist.id);
    const undoIds = this.removeList.map(motorist => motorist.id);

    forkJoin([
      this.associateMotorist(addIds),
      this.disassociateMotorist(undoIds)
    ]).subscribe(
      success => this.onSuccessRequest(success),
      error => console.log(error));
  }

  onSuccessRequest(data) {
    console.log(data);
    if (data.success) {
      // todo: toast
    }
    this.getMotorists();
    this.addList = new Array<any>();
    this.removeList = new Array<any>();
  }

  associateMotorist(addIds: Array<any>): Observable<any> {
    if (addIds.length === 0) {
      return Observable.of([]);
    }
    return this.motoristService.associateMotorist(addIds);
  }

  disassociateMotorist(undoIds: Array<any>): Observable<any> {
    if (undoIds.length === 0) {
      return Observable.of([]);
    }
    return this.motoristService.disassociateMotorist(undoIds);
  }
}
