import { Component, OnInit } from '@angular/core';
import { TripObject } from '../../../shared/services/trip-object.service';
import { TruckService } from '../../../truck/truck.service';

@Component({
  selector: 'sga-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['../motorist/motorist.component.scss'],
  providers:[TruckService]
})
export class TrucksComponent implements OnInit {

 
 
  selectedTruck: any;

  public trucks: Array<any>;
  public associateTruck= new Array<any>();

  public obj= new Array<any>();

  public showRegisterForm = false;
  public truckInfos = new Array<any>();
  constructor(private truckService: TruckService, private formService:TripObject) { }

  ngOnInit(): void {

    this
    .truckService
    .getTrucks()
    .subscribe(
      list => this.trucks = list
    )

    this
      .formService
      .currentObj
      .subscribe(obj => this.obj = obj)
      
      if(this.obj['trailers']){
        debugger
        this.associateTruck = this.obj['trailers'];
      }
   
  }

  ngOnDestroy(){
    this.formService.updateObj(this.associateTruck,'trailers');
  }

  public showTruckData(truck) {
    this.selectedTruck = truck;
  }


  public showTruckForm() {  
    this.showRegisterForm = true;
  }

  public closeFormRegister() {
    this.showRegisterForm = false;
  }

  public TruckSelected(truck: any): void {
    this.associateTruck.push(truck);
    this.selectedTruck = truck;
  }

  public removeAssociate(truck: any): void {
    const index = this.associateTruck.findIndex(a => a === truck);
    this.associateTruck.splice(index, 1);
    this.selectedTruck =null;
  }
}