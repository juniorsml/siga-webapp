import { Component, Input } from '@angular/core';


@Component({
  selector: 'sga-commands-historic',
  templateUrl: './commands-historic.component.html',
  styleUrls: ['./commands-historic.component.scss']
})

export class CommandsHistoricComponent {
  @Input() public trip: any;
}
