import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../dataform.service';

@Component({
  selector: 'sga-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['../motorist/motorist.component.scss'],
  providers:[FormService]
})
export class TrucksComponent implements OnInit {

 
 
  selectedTruck: any;

  public trucks: Array<any>;
  public associateTruck= new Array<any>();

  public showRegisterForm = false;
  public truckInfos = new Array<any>();
  constructor(private router: ActivatedRoute, private formService:FormService) { }

  ngOnInit(): void {
    this.router.data.subscribe(
      data => (this.trucks = data.vehicles || new Array<any>())
    );
  }

  ngOnDestroy(){
    
    this.formService.updateObj(this.truckInfos,'trailers');
   
    let unwrap = ({id, type, vehiclePlate}) => ({id, type, vehiclePlate});

    for(let item of this.associateTruck){
       const filterTruckKey = unwrap(item);
       this.truckInfos.push(filterTruckKey);
    }
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