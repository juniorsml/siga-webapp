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
    this.setCurrentVehicles();
  }


  public showFormRegister = false;
  
  openFormRegister() {
    this.showFormRegister = !this.showFormRegister;
  }

  closeFormRegister() {
    this.showFormRegister = false;
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

  constructor(private router: ActivatedRoute) {}

  ngOnInit() :void {
    this.router.data.subscribe(data => this.vehicles = data.vehicles);
  }

  private setCurrentVehicles() {
    this.currentList = [];
    this.vehicles.map(vehicle => {
      if (!this.vehicleIsDuplicate(vehicle.id)) this.currentList.push(vehicle);
    });
  }

  private vehicleIsDuplicate(vehicleId): boolean {
    return this.removeList.find(m => m.id == vehicleId);
  }

  public onVehicleSelected(vehicle) {
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
    suggestion;
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
    if (event.cellIndex === 5) this.deleteVehicle(event.data);
  }

  applyChanges() {}
}
