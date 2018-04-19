import { Component } from '@angular/core';

@Component({
  selector: 'sga-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.scss']
})
export class TrucksComponent {
  public vehicles = new Array<any>();
  public trip: any;

  public showMotoristForm(event): void {
    event;
  }

  public onMotoristSelected(event): void {
    event;
  }
}
