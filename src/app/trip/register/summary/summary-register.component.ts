import { Component, Input, OnInit } from '@angular/core';

import { TripObject } from '../../../shared/services/trip-object.service';


@Component({
  selector: 'sga-summary-register',
  templateUrl: './summary-register.component.html',
  styleUrls: ['./summary-register.component.scss']
})

export class SummaryRegisterComponent implements OnInit{
  @Input() public trip: any;
  
  public state:any;
  
  public formdata$;

  constructor(private summaryData : TripObject){}

  public print(): void {
     window.print();
  }

  ngOnInit() {

    this.summaryData.currentObj.subscribe(obj => this.state = obj);
    console.log(this.state);

  }
}
