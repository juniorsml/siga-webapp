import { Component, EventEmitter, Output, Input } from '@angular/core';

import { rules } from '../../../shared/mocks/rules';

@Component({
  selector: 'sga-add-rules-dialog',
  templateUrl: './add-rules-dialog.component.html',
  styleUrls: ['./add-rules-dialog.component.scss']
})
export class AddRulesDialogComponent {
 
  @Input() showModal: boolean;

  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();



  public rulesManagement = rules;
 

  @Input() selectedRules = new Array<any>();
  public addedClass = false;


  cancel() {
    this.showModal = false;
    this.onDialogClose.emit();
  }

  itemClick(item){
    this.selectedRules.push(item);
    console.log(this.selectedRules);
    item.addedClass = true;
  }

  confirm() {
    this.showModal = false;
    this.onConfirm.emit();
  }
}
