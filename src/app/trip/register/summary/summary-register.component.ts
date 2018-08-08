import { Component, Input } from '@angular/core';


@Component({
  selector: 'sga-summary-register',
  templateUrl: './summary-register.component.html',
  styleUrls: ['./summary-register.component.scss']
})

export class SummaryRegisterComponent {
  @Input() public trip: any;

  public print(): void {
     window.print();
  }
}
