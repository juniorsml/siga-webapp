import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})

export class VehiclesComponent implements OnInit {

  @Output() onVehicleSelected: EventEmitter<any> = new EventEmitter();
  selectedVehicle: any;

  public vehicles: Array<any>;
  public associateVehicle = new Array<any>();

  public showRegisterForm = false;

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.data.subscribe(
      data => (this.vehicles = data.vehicles || new Array<any>())
    );
  }

  public showVehicleData(event) {
    this.selectedVehicle = event.data;
    this.onVehicleSelected.emit(this.selectedVehicle);
   
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
  }
}
