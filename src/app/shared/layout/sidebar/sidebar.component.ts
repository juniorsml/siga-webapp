import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';

@Component({
  selector: 'sga-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.scss' ] 
})
export class SidebarComponent {
  public user: any;

  public accordion: AccordionComponent;

  constructor(public router: Router) {}

}
