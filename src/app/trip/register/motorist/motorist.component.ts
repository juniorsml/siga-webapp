import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../dataform.service';

@Component({
  selector: 'sga-motorist',
  templateUrl: './motorist.component.html',
  styleUrls: ['./motorist.component.scss'],
  providers:[FormService]
})

export class MotoristComponent implements OnInit {
  selectedMotorist: any;
  state;
  public motorists: Array<any>;
  public associateMotorist = new Array<any>();

  public showMotoristRegister = false;
  public motoristInfos  = new Array<any>();

  constructor(private router: ActivatedRoute, private motoristInfo: FormService) { }

  ngOnInit(): void {
    this.router.data.subscribe(
      data => (this.motorists = data.motorists || new Array<any>())
    );
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


