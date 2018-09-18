import { Component, OnInit } from '@angular/core';

import { TripObject } from '../../../shared/services/trip-object.service';
import { MotoristService } from '../../../motorist/motorist.service';

@Component({
  selector: 'sga-motorist',
  templateUrl: './motorist.component.html',
  styleUrls: ['./motorist.component.scss'],
  providers:[MotoristService]
})

export class MotoristComponent implements OnInit {
  selectedMotorist: any;
  public state:any;
  public motorists: Array<any>;
  public associateMotorist = new Array<any>();
  public listOfMotorists: any;
  public showMotoristRegister = false;
  public motoristInfos  = new Array<any>();

  constructor(private motoristService: MotoristServicegit , private motoristInfo: TripObject) {
    
    this.motoristInfo.objTrip.subscribe(obj => this.state = obj);

   }

  ngOnInit(): void {
    

    this
      .motoristService
      .getMotorists()
      .subscribe(list => this.motorists = list);

  }

  ngOnDestroy(){
    
    this.motoristInfo.updateObj(this.motoristInfos,'motorists')

    this.motoristInfo.currentObj.subscribe(obj => this.state = obj); 

    let unwrap = ({id, documentId, firstName, lastName}) => ({id, documentId, firstName, lastName});

    for(let item of this.associateMotorist){
       const filteredMotoristKey = unwrap(item);
       this.motoristInfos.push(filteredMotoristKey);
    }
  }

  public showMotoristData(motorist) {
    this.selectedMotorist = motorist;
  }

  public showMotoristForm() {
    this.showMotoristRegister = true;
  }

  public motoristFormClose() {
    this.showMotoristRegister = false;
  }

  public MotoristSelected(motorist: any): void {
    this.associateMotorist.push(motorist);
    this.selectedMotorist = motorist;
  }

  public removeAssociate(motorist: any): void {
    const index = this.associateMotorist.findIndex(a => a === motorist);
    this.associateMotorist.splice(index, 1);
    this.selectedMotorist = null;
  }
}


