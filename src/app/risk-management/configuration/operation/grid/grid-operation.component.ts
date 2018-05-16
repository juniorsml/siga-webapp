import { Component, OnInit, Input } from '@angular/core';
import { TableClickEvent } from '../../../../shared/components/table/table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-grid-operation',
  templateUrl: './grid-operation.component.html',
  styleUrls: ['./grid-operation.component.scss']
})
export class GridOperationComponent implements OnInit {

  public text: any;
  public styleClass: any;
  public filterLocation: any;
  public filterDistance: any;
  public selectedDevice: any;
  public onDeviceSelected: any;
 

   @Input()
  public hasHeight = false;

  @Input()
  public showFilterBar = true;

  @Input()
  public operations = new Array<any>();
  
  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => this.operations = data.operations);
  }

  public onPlacesFiltered(event) {
    this.filterDistance = event.distance;
    this.filterLocation = { lat: event.lat, lng: event.lng };
  }

  public onPlacesFilterRemoved() {
    this.filterDistance = null;
    this.filterLocation = null;
  }
  
  public onCellClick(event) {
    this.selectedDevice = event.data;
    this.onDeviceSelected.emit(this.selectedDevice);
    // if (event.cellIndex === 0) this.showMotoristDialog = true;
  }

  public onCellRightClick(event: TableClickEvent) {
    this.selectedDevice = event.data;
    this.onDeviceSelected.emit(this.selectedDevice);
  }
}
