import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-associate-vehicle',
  templateUrl: './associate-vehicle.component.html',
  styleUrls: ['./associate-vehicle.component.scss']
})
export class AssociateVehicleComponent implements OnInit {
  @Input() 
  public showDialog: boolean;

  @Input()
  get vehicles(): Array<any> {
    return this._vehicles;
  }
  set vehicles(vehicles: Array<any>) {
    this._vehicles = vehicles;
    this.setCurrentvehicles();
  }

  private _vehicles: Array<any> = [];

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
    this.router.data.subscribe(data => this.vehicles = data.vehicles);
  }

  private setCurrentvehicles() {
    this.currentList = [];
    this.vehicles.map(motorist => {
      if (!this.motoristIsDuplicate(motorist.id)) this.currentList.push(motorist);
    });
  }

  private motoristIsDuplicate(motoristId): boolean {
    return this.removeList.find(m => m.id == motoristId);
  }

  public onVehicleselected(motorist) {
    this.addList.push(motorist);
  }

  public showMotoristModal(id) {
    this.showMotoristDialog = true;
    this.selectedMotorist = this.vehicles.filter(m => m.id === id)[0];
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
