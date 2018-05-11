import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { groups } from '../../../shared/mocks/group';

@Component({
  selector: 'sga-modal-group',
  templateUrl: './modal-group.component.html',
  styleUrls: ['./modal-group.component.scss']
})
export class ModalGroupComponent implements OnInit {
  public groups: Array<any>;

  @Output() public onCloseDialog = new EventEmitter<void>();
  @Output() public onSelectedGroup = new EventEmitter<any>();

  ngOnInit() {
    this.groups = groups;
  }

  public selectGroup(group: any) {
    debugger
    this.onSelectedGroup.emit(group);
  }

  public close() {
    this.onCloseDialog.emit();
  }
}
