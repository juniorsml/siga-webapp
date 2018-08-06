import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sga-associate-vehicle',
  templateUrl: './associate-vehicle.component.html',
  styleUrls: ['../../motorist/associate-dialog/motorist-associate-dialog.component.scss'],
  providers: [VehicleService]
})
export class AssociateVehicleComponent implements OnInit {
  @Input()
  public showDialog: boolean;

  @Input()
  public showForm: boolean;

  @Input() haveFooter = true;

  @Input()
  get vehicles(): Array<any> {
    return this._vehicles;
  }
  set vehicles(vehicles: Array<any>) {
    this._vehicles = vehicles;
    this.setCurrentVehicles();
  }

  private _vehicles: Array<any> = [];

  public selectedVehicle: any;
  public showVehicleDialog = false;
  public showVehicleRegister = false;

  public addList: Array<any> = [];
  public removeList: Array<any> = [];
  public currentList: Array<any> = [];

  public searchText: any;
  public hideAdminErrorModal = true;

  public showFormRegister = false;

  openFormRegister() {
    this.showFormRegister = !this.showFormRegister;
  }

  closeFormRegister() {
    this.showFormRegister = false;
  }

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  public getVehicles() {
    this
      .vehicleService
      .getVehicles()
      .subscribe(
        data => this.vehicles = data,
        error => console.warn(error));
  }

  private setCurrentVehicles() {
    this.currentList = [];
    this.vehicles.map(vehicle => {
      if (!this.vehicleIsDuplicate(vehicle.id)) {
        this.currentList.push(vehicle);
      }
    });
  }

  private vehicleIsDuplicate(vehicleId): boolean {
    return this.removeList.find(m => m.id === vehicleId);
  }

  public onVehicleSelected(vehicle) {
    debugger
    this.addList.push(vehicle);
  }

  public showVehicleModal(id) {
    this.showVehicleDialog = true;
    this.selectedVehicle = this.vehicles.filter(m => m.id === id)[0];
  }

  public vehicleDialogClose() {
    this.showVehicleDialog = false;
  }

  public undoAddVehicle(vehicle) {
    this.removeFromList(this.addList, vehicle);
  }

  public deleteVehicle(vehicle) {
    this.removeFromList(this.currentList, vehicle);
    this.removeList.push(vehicle);
  }

  public undoRemoveVehicle(vehicle) {
    this.removeFromList(this.removeList, vehicle);
    this.currentList.unshift(vehicle);
  }

  public showVehicleForm(suggestion) {
    console.log(suggestion);
    this.showVehicleRegister = true;
  }

  public vehicleFormClose() {
    this.showVehicleRegister = false;
  }

  private removeFromList(list, vehicle) {
    const indexToRemove = list.findIndex(m => m.id === vehicle.id);
    list.splice(indexToRemove, 1);
  }

  onAdminVehicleCellClick(event) {
    if (event.cellIndex === 5) {
      this.deleteVehicle(event.data);
    }
  }

  applyChanges() {
    const addIds = this.addList.map(vehicle => vehicle.id);
    const undoIds = this.removeList.map(vehicle => vehicle.id);

    forkJoin([
      this.associateVehicle(addIds),
      this.disassociateVehicle(undoIds)
    ]).subscribe(
      success => this.onSuccessRequest(success),
      error => console.log(error));
  }

  onSuccessRequest(data) {
    console.log(data);
    if (data.success) {
      // todo: toast
    }
    this.getVehicles();
    this.addList = new Array<any>();
    this.removeList = new Array<any>();
  }

  associateVehicle(addIds: Array<any>): Observable<any> {
    if (addIds.length === 0) {
      return Observable.of([]);
    }
    return this.vehicleService.associateVehicle(addIds);
  }

  disassociateVehicle(undoIds: Array<any>): Observable<any> {
    if (undoIds.length === 0) {
      return Observable.of([]);
    }
    return this.vehicleService.disassociateVehicle(undoIds);
  }
}
