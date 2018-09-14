import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../dataform.service';

@Component({
  selector: 'sga-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['../motorist/motorist.component.scss'],
  providers:[FormService]
})

export class VehiclesComponent implements OnInit {

  selectedVehicle: any;

  public vehicles: Array<any>;
  public associateVehicle = new Array<any>();
  public vehiclesInfos = new Array<any>();

  public showRegisterForm = false;

  constructor(private router: ActivatedRoute, private formService:FormService) { }

  ngOnInit(): void {
    this.router.data.subscribe(
      data => (this.vehicles = data.vehicles || new Array<any>())
    );
  }

  ngOnDestroy(){
    
    this.formService.updateObj(this.vehiclesInfos,'vehicles');
   
    let unwrap = ({id, type, vehiclePlate}) => ({id, type, vehiclePlate});

    for(let item of this.associateVehicle){
       const filterVehiclesKey = unwrap(item);
       this.vehiclesInfos.push(filterVehiclesKey);
    }
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
