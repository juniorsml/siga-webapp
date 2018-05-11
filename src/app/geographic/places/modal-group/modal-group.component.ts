import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { groups } from '../../../shared/mocks/group';

@Component({
  selector: 'sga-modal-group',
  templateUrl: './modal-group.component.html',
  styleUrls: ['./modal-group.component.scss']
})
export class ModalGroupComponent implements OnInit {
  @Output() public onSaveDialog = new EventEmitter<any>();
  @Output() public onCancelDialog = new EventEmitter<void>();

  public groups: Array<any>;

  private selectedGroup: any;

  ngOnInit() {
    this.groups = groups;
  }

  public selectGroup(group: any) {
    this.groups.map(i => i.selected = false);
    group.selected = true;

    this.selectedGroup = group;
  }

  public save() {
    this.onSaveDialog.emit(this.selectedGroup);
  }

  public cancel() {
    this.onCancelDialog.emit();
  }
}
