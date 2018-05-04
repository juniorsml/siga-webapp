import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'sga-summary-motorist',
  templateUrl: './summary-motorist.component.html',
  styleUrls: ['./summary-motorist.component.scss']
})

export class SummaryMotoristComponent implements OnInit {

 constructor(private router: ActivatedRoute) {}

 public motorists: Array<any>;
 selectedMotorist: any;

 ngOnInit(): void {
    this.router.data.subscribe(
      data => (this.motorists = data.motorists || new Array<any>())
    );
  }
  public showMotoristData(motorist) {
    this.selectedMotorist = motorist
  }
  public associateMotorist = new Array<any>();
	 public MotoristSelected(motorist: any): void {
	    this.associateMotorist.push(motorist);
	  }
	 public removeAssociate(motorist: any): void {
	    const index = this.associateMotorist.findIndex(a => a === motorist);
	    this.associateMotorist.splice(index, 1);
	    this.selectedMotorist = null;
	  }

}

 