
import { TruckService } from '../truck.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sga-associate-truck',
  templateUrl: './associate-truck.component.html',
  styleUrls: ['../../motorist/associate-dialog/motorist-associate-dialog.component.scss'],
  providers :[TruckService]
})
export class AssociateTruckComponent implements OnInit {
  @Input()
  public showDialog: boolean;

  public haveFooter = true;
  private _vehicles: Array<any> = [];

  public selectedVehicle: any;
  public showVehicleDialog = false;
  public showVehicleRegister = false;
  
  public addList: Array<any> = [];
  public removeList: Array<any> = [];
  public currentList: Array<any> = [];
  
  public searchText: any;
  public hideAdminErrorModal = true;
  
  constructor( private truckService: TruckService) {}
  
  public showFormRegister = false;

  ngOnInit(): void {
    this.getVehicles();
  }

  public getVehicles() {
    this
      .truckService
      .getTrucks()
      .subscribe(
        data => this.vehicles = data,
        error => console.warn(error));
  }

  
  @Input()
  get vehicles(): Array<any> {
    return this._vehicles;
  }
  set vehicles(vehicles: Array<any>) {
    this._vehicles = vehicles;
    this.setCurrentVehicles();
  }


  openFormRegister() {
    this.showFormRegister = !this.showFormRegister;
  }

  closeFormRegister() {
    this.showFormRegister = false;
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
    this.addList.push(vehicle);
  }

  public showVehicleModal(motorist) {
    this.showVehicleDialog = true;
    this.selectedVehicle = motorist;
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

  applyChanges() {}
}
