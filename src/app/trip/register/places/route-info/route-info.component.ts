import { Component, Input } from '@angular/core';

@Component({
  selector: 'sga-route-info',
  templateUrl: './route-info.component.html',
  styleUrls: ['./route-info.component.scss']
})
export class RouteInfoComponent {
  @Input() public name: string;
  @Input() public duration: string;
  @Input() public distance: string;
}
