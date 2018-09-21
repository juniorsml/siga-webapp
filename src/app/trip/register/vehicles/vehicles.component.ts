import { Component, OnInit } from '@angular/core';
import { TripObject } from '../../../shared/services/trip-object.service';
import { VehicleService } from '../../../vehicle/vehicle.service';

@Component({
  selector: 'sga-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['../motorist/motorist.component.scss'],
  providers:[VehicleService]
})

export class VehiclesComponent implements OnInit {

  selectedVehicle: any;

  public vehicles: Array<any>;
  public associateVehicle = new Array<any>();
  public vehiclesInfos = new Array<any>();
  public obj = new Array<any>();


  public showRegisterForm = false;

  constructor(private vehicleService: VehicleService, private formService:TripObject) { }

  ngOnInit(): void {
    this
      .vehicleService
      .getVehicles()
      .subscribe(list => this.vehicles = list);

      this
      .formService
      .currentObj
      .subscribe(obj => this.obj = obj)
      
      if(this.obj['vehicles']){
        debugger
        this.associateVehicle = this.obj['vehicles'];
      }
  }

  ngOnDestroy(){
    this.formService.updateObj(this.associateVehicle,'vehicles');
  }

  public showVehicleData(vehicle) {
    this.selectedVehicle = vehicle;
  }

  public showVehicleForm() {
    this.showRegisterForm = true;
  }

  public closeFormRegister() {
    this.showRegisterForm = false;
  }

  public VehicleSelected(vehicle: any): void {
    this.associateVehicle.push(vehicle);
    this.selectedVehicle = vehicle;
  }

  public removeAssociate(vehicle: any): void {
    const index = this.associateVehicle.findIndex(a => a === vehicle);
    this.associateVehicle.splice(index, 1);
    this.selectedVehicle = null;
  }
}
