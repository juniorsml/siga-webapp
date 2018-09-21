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
  public obj = new Array<any>();;
  public motorists: Array<any>;
  public associateMotorist = new Array<any>();
  public listOfMotorists: any;
  public showMotoristRegister = false;
  public motoristInfos  = new Array<any>();

  constructor(private motoristService: MotoristService , private motoristInfo: TripObject) {}

  ngOnInit(): void {
    

    this
      .motoristService
      .getMotorists()
      .subscribe(list => this.motorists = list);

      this
      .motoristInfo
      .currentObj
      .subscribe(obj => this.obj = obj)
      
      if(this.obj['motorists']){
        debugger
        this.associateMotorist = this.obj['motorists'];
      }


  }

  ngOnDestroy(){
    
    this.motoristInfo.updateObj(this.associateMotorist,'motorists')

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


