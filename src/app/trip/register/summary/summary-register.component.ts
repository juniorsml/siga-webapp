import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../dataform.service';


@Component({
  selector: 'sga-summary-register',
  templateUrl: './summary-register.component.html',
  styleUrls: ['./summary-register.component.scss'],
  providers:[FormService]
})

export class SummaryRegisterComponent implements OnInit{
  @Input() public trip: any;
  state;
  public formdata$;
  constructor(private summaryData : FormService){}

  public print(): void {
     window.print();
  }

  ngOnInit() {
    this.formdata$ = this.summaryData.currentObj.first().subscribe(obj => this.state = obj);
    console.log(this.state);
  }
}
