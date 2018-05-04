import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sga-grid-control',
  templateUrl: './grid-control.component.html',
  styleUrls: ['./grid-control.component.scss']
})
export class GridControlComponent {
  @Input() public title: string;
  @Input() public data: Array<any>;
  
  @Output() public onRegisterClick = new EventEmitter();
  @Output() public onItemSelected = new EventEmitter<any>();

  public openRegister() {
    this.onRegisterClick.emit();
  }

  public onSelected(event) {
    this.onItemSelected.emit(event);
  }
}
