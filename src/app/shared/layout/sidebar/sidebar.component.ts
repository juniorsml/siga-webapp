
import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';

@Component({
  selector: 'sga-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.scss' ]
})
export class SidebarComponent {
  public user: any;

  public accordion: AccordionComponent;

  constructor(public router: Router) {}

  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

   ngOnInit() {
    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      alwaysVisible: true,
      gridOpacity: '0.2',
      barOpacity: '0.5',
      gridBackground: '#ccc',
      gridWidth: '6px',
      gridMargin: '2px 2px',
      barBackground: 'rgba(55, 56, 58, 0.6)',
      barWidth: '5px',
      barMargin: '2px 2px'
    };
  }

}
