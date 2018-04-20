import { Component, OnInit,EventEmitter, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.scss']
})
export class TrucksComponent implements OnInit {

 
  @Output() onTruckSelected: EventEmitter<any> = new EventEmitter();
  selectedTruck: any;

  public trucks: Array<any>;
  public associateTruck= new Array<any>();

  public showRegisterForm = false;

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.data.subscribe(
      data => (this.trucks = data.vehicles || new Array<any>())
    );
  }

  public showVehicleData(event) {
    this.selectedTruck = event.data;
    this.onTruckSelected.emit(this.selectedTruck);
   
  }


  public showVehicleForm() {  
    this.showRegisterForm = true;
  }

  public closeFormRegister() {
    this.showRegisterForm = false;
  }

  public VehicleSelected(truck: any): void {
    this.associateTruck.push(truck);
  }

  public removeAssociate(truck: any): void {
    const index = this.associateTruck.findIndex(a => a === truck);
    this.associateTruck.splice(index, 1);
  }
}