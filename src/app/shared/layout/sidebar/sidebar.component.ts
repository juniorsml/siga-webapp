import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sga-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.scss' ] 
})
export class SidebarComponent {

  constructor(public router: Router) {}
}
