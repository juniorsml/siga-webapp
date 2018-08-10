import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sga-summary-vehicle',
  templateUrl: './summary-vehicle.component.html',
  styleUrls: ['./summary-vehicle.component.scss']
})

export class SummaryVehicleComponent implements OnInit {
  
  @Input() public vehicles: Array<any>;
  
  public associateVehicle = new Array<any>();
  public showRegisterForm = false;
  public selectedVehicle: any;

  ngOnInit(): void {
    if (this.vehicles === null || 
        this.vehicles.length === 0) return;

    this.associateVehicle = this.vehicles;
    this.showVehicleData(this.associateVehicle[0]);
  }

  public showVehicleData(vehicle) {
    this.selectedVehicle = vehicle
  }

  public showVehicleForm() {  
    this.showRegisterForm = true;
  }

  public closeFormRegister() {
    this.showRegisterForm = false;
  }

  public VehicleSelected(vehicle: any): void {
    this.associateVehicle.push(vehicle);
  }

  public removeAssociate(vehicle: any): void {
    const index = this.associateVehicle.findIndex(a => a === vehicle);
    this.associateVehicle.splice(index, 1);
    this.selectedVehicle = null;
  }
}