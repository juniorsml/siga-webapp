import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-motorist',
  templateUrl: './motorist.component.html',
   styleUrls: ['./motorist.component.scss',]
})

export class MotoristComponent implements OnInit {
  selectedMotorist: any;

  public motorists: Array<any>;
  public associateMotorist = new Array<any>();

  public showMotoristRegister = false;

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.data.subscribe(
      data => (this.motorists = data.motorists || new Array<any>())
    );
  }

  public showMotoristData(motorist) {
    this.selectedMotorist = motorist
  }


  public showMotoristForm() {  
    debugger
    this.showMotoristRegister = true;
  }

  public motoristFormClose() {
    this.showMotoristRegister = false;
  }

  public MotoristSelected(motorist: any): void {
    this.associateMotorist.push(motorist);
  }

  public removeAssociate(motorist: any): void {
    const index = this.associateMotorist.findIndex(a => a === motorist);
    this.associateMotorist.splice(index, 1);
    this.selectedMotorist = null;
  }
}


