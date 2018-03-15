import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableClickEvent } from '../../shared/components/table/table.component';

@Component({
  selector: 'sga-grid-motorist',
  templateUrl: './grid-motorist.component.html',
  styleUrls: ['./grid-motorist.component.scss']
})
export class GridMotoristComponent {
  @Input() motorists = new Array();
  @Input() dataLoading: boolean = true;
  @Output() onMotoristSelected: EventEmitter<any> = new EventEmitter();

  text: any;
  distance: any;
  motorist: any;
  placeText: any;
  styleClass: any;
  filterLocation: any;
  filterDistance: any;
  selectedMotorist: any;
  contextMenuSelected: any;

  showDialog = false;
  showMotoristDialog: boolean;

  public showMotoristModal() {
    this.showMotoristDialog = true;
  }

  public motoristDialogClose() {
    this.showMotoristDialog = false;
  }

  public onCellClick(event) {
    this.selectedMotorist = event.data;
    this.onMotoristSelected.emit(this.selectedMotorist);
    if (event.cellIndex === 0) this.showMotoristDialog = true;
  }

  onCellRightClick(event: TableClickEvent) {
    this.selectedMotorist = event.data;
    this.onMotoristSelected.emit(this.selectedMotorist);
  }

  public onPlacesFiltered(event) {
    event.target;
  }

  public onPlacesFilterRemoved(event) {
    event.target;
  }

  public onPlacesKeyUp() {}

  public onDistanceKeyUp() {}
}
