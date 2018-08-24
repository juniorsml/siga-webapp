import { Component, EventEmitter, Output, Input } from '@angular/core';

import { rules } from '../../../shared/mocks/rules';

import { RulePipe } from '../../../shared/filters/rules.pipe'

@Component({
  selector: 'sga-add-rules-dialog',
  templateUrl: './add-rules-dialog.component.html',
  styleUrls: ['./add-rules-dialog.component.scss']
})
export class AddRulesDialogComponent {
 
  @Input() showModal: boolean;

  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() data: EventEmitter<any> = new EventEmitter<any>();


  public rulesManagement = rules; 

  public selectedRules = new Array<any>();

  public addedClass = false;

  public removedClass = false;

  cancel() {
    this.showModal = false;
    this.onDialogClose.emit();
  }

  public addItem(item) {
    debugger
    this.selectedRules.push(item);
    console.log(this.selectedRules);
    item.addedClass = true;
    item.removedClass = false;
    
  }

  public removeItem(rule: any): void {
    const index = this.selectedRules.findIndex(a => a === rule);
    this.selectedRules.splice(index, 1);
    rule.removedClass = true;
    rule.addedClass = false;
  }

  confirm() {
    this.showModal = false;
    this.data.emit(this.selectedRules);
  }
}
