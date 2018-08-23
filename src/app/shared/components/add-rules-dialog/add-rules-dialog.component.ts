import { Component, EventEmitter, Output, Input } from '@angular/core';

import { rules } from '../../../shared/mocks/rules';

@Component({
  selector: 'sga-add-rules-dialog',
  templateUrl: './add-rules-dialog.component.html',
  styleUrls: ['./add-rules-dialog.component.scss']
})
export class AddRulesDialogComponent {
 
  @Input() showModal: boolean;
  @Input() type: string;
  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();


  public rulesManagement = rules;
  public associateRules = new Array<>;


  cancel() {
    this.showModal = false;
    this.onDialogClose.emit();
  }

  itemClick(item){
    this.associateRules.push(item);
    console.log(this.associateRules);
  }

  confirm() {
    this.showModal = false;
    this.onConfirm.emit();
  }
}
