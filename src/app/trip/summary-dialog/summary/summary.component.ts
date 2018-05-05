import { Component, Input } from '@angular/core';


@Component({
  selector: 'sga-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})

export class SummaryComponent {
  @Input() public trip: any;
}

 