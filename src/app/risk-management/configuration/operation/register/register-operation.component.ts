import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { rules } from '../../../../shared/mocks/rules';

@Component({
  selector: 'sga-register-operation',
  templateUrl: './register-operation.component.html',
  styleUrls: ['./register-operation.component.scss']
})
export

 class RegisterOperationComponent {


  @Input()
  public showForm: boolean;
  @Output() onFormClose: EventEmitter<any> = new EventEmitter();


  public selectedTabIndex = 0;

  
  public rulesManagement = rules;

  

  public associateRules: Array<any> = [];


  ngOnInit(): void {
    debugger
  }

  

  public onSubmit(formOperation: NgForm) {
    const {} = formOperation.value;
    this.onFormClose.emit();
  }

  cancel() {
    this.onFormClose.emit();
  }
}



