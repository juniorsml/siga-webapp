import { Component } from '@angular/core';

@Component({
  selector: 'sga-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  public motorists = new Array<any>();
  public trip: any;

  public showMotoristForm(event): void {
    event;
  }

  public onMotoristSelected(event): void {
    event;
  }
}
