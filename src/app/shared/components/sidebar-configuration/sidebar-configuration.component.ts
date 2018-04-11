import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sga-sidebar-configuration',
  templateUrl: './sidebar-configuration.component.html',
  styleUrls: ['./sidebar-configuration.component.scss']
})
export class SidebarConfigurationComponent {

	private status: boolean = false;

	toggleMenu(){
	    this.status = !this.status;       
	}
  

}
