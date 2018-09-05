import { Component, Output, EventEmitter, Input, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';



import { OperationService } from '../operation.service';

import { Observable } from '../../../../../../node_modules/rxjs';
import { of } from '../../../../../../node_modules/rxjs';
import { concatMap} from '../../../../../../node_modules/rxjs/operators';

import { rules } from '../../../../shared/mocks/rules';


@Component({
  selector: 'sga-register-operation',
  templateUrl: './register-operation.component.html',
  styleUrls: ['./register-operation.component.scss'],
  providers: [OperationService]
})


export class RegisterOperationComponent implements OnInit {

  @Input()
  public showForm: boolean;
  public selectedTabIndex = 0;
  public onRulesSelected: any;
  public selectedRules: any;
  public showAddrules = false;

  public rulesManagement = rules;
  public filteredRules:any;
  rulesByEndTrip:any;
  selectedRuleStart:any;

  rulesByStartTrip:any;
  selectedRuleEnd:any;

  @Output() onFormClose: EventEmitter<any> = new EventEmitter();

 
  @ViewChild('formOperation') formOperation: any;

  constructor(private operationService: OperationService) {}

  ngOnInit():void {
    this.filteredRules = this.rulesManagement.tags.filter(a => a.name.indexOf(`inicio de viagem`) > 0);
    console.log(this.filteredRules);
  }

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
  create(formOperation: NgForm): Observable<any> {
    const operation = this.buildOperation(formOperation);
    return this .operationService.saveOperation(operation);
  }

  public updateOperation(operation) {
     return this.operationService.updateOperation(operation);
  }

  public buildOperation(formOperation: NgForm) {

    debugger
    const operation = {
      rules:[
        this.selectedRules
      ],
      ...formOperation.value
    }


    return operation;
  }

  onError = error => console.log(error);


  cancel() {
    this.onFormClose.emit();
  }
  public openAddRules() {
     this.showAddrules = true;
  }
  public AddRules(event: any) {
    this.showAddrules = false ;
    this.selectedRules = event;
  }

  changeEndRule(event) {
     this.selectedRuleEnd = true;
     this.rulesByEndTrip = event;
  }

  changeStartRule(event) {
     this.selectedRuleStart = true;
     this.rulesByStartTrip = event;
  }

  public closeDialog = () => this.showAddrules = false;

}



