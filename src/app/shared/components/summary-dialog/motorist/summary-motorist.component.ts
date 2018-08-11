import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sga-summary-motorist',
  templateUrl: './summary-motorist.component.html',
  styleUrls: ['./summary-motorist.component.scss']
})
export class SummaryMotoristComponent implements OnInit {

  @Input() public motorists = new Array<any>();
  
  public selectedMotorist: any;
  public associateMotorist = new Array<any>();
  
  ngOnInit(): void {
    if (this.motorists === null || 
        this.motorists.length === 0) return;

    this.associateMotorist = this.motorists;
    this.showMotoristData(this.associateMotorist[0]);
  }

  public showMotoristData(motorist) {
    this.selectedMotorist = motorist;
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
