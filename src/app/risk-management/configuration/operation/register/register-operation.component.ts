import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';



import { OperationService } from '../operation.service';

import { Observable } from '../../../../../../../node_modules/rxjs';
import { of } from '../../../../../../node_modules/rxjs';
import { concatMap} from '../../../../node_modules/rxjs/operators';



@Component({
  selector: 'sga-register-operation',
  templateUrl: './register-operation.component.html',
  styleUrls: ['./register-operation.component.scss'],
  providers: [OperationService]
})
export

 class RegisterOperationComponent {


  showAddrules = false;

  @Input()
  public showForm: boolean;
  @Output() onFormClose: EventEmitter<any> = new EventEmitter();

  @ViewChild('formOperation') formOperation: any;

  constructor(private operationService: OperationService) {}



  public selectedTabIndex = 0;

  public onRulesSelected: any;

  public selectedRules: any;

  onSubmit() {
   if ( this.formOperation.valid ) {
     const operation$ = this.create(this.formOperation);
     const request$ = operation$.pipe(
           concatMap((operation : any) => (operation.value) ? this.updateOperation(operation.value) : of(operation)));
     request$.subscribe(operation => this.onRegister(operation) , error =>this.onError(error));
   }
  }


  public onRegister(operation) {
    this.formOperation.reset();
    this.onFormClose.emit(operation);
  }




  cancel() {
    this.onFormClose.emit();
  }
  public openAddRules() {
     this.showAddrules = true;
  }
 
  public AddRules(event: any){    
    this.showAddrules = false ;
    this.selectedRules = event;
  }

  public closeDialog = () => this.showAddrules = false;

}



