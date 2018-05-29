import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sga-grid-control',
  templateUrl: './grid-control.component.html',
  styleUrls: ['./grid-control.component.scss']
})
export class GridControlComponent {
  @Input() public title: string;
  @Input() public data: Array<any>;
  @Input() public marginTop: string;
  @Input() public useContext: boolean;
  @Input() haveFooter: boolean = false;

  @Output() public onRegisterClick = new EventEmitter();
  @Output() public onItemSelected = new EventEmitter<any>();
  @Output() public onContextClick = new EventEmitter<any>();
  @Output() public onCellRightClick = new EventEmitter<any>();

  public selectedItem: any;

  public openRegister() {
    this.onRegisterClick.emit();
  }

  public onSelected(event) {
    this.onItemSelected.emit(event);
  }

  public onContextMenu(index) {
    this.onContextClick.emit({ index, item: this.selectedItem });
  }

  public onCellRightSelected(item) {
    this.selectedItem = item;
    this.onCellRightClick.emit(item);
  }
}
