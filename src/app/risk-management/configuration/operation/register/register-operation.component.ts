import { Component, Output, EventEmitter, Input, ViewChild, OnInit } from '@angular/core';
import { OperationService } from '../operation.service';
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
  public selectedRules: Array<any> = [];
  public showAddrules = false;

  public rulesManagement = rules;

  public filteredRulesStart:Array<any> = [];
  
  public filteredRulesEnd:Array<any> = [];
  
  rulesByEndTrip:any;
  selectedRuleStart:any;

  rulesByStartTrip:any;
  selectedRuleEnd:any;

  @Output() onFormClose: EventEmitter<any> = new EventEmitter();

 
  @ViewChild('formOperation') formOperation: any;

  constructor(private operationService: OperationService) {}

  buidMandatoryRules(rulesFiltered: Array<any>, term:string){
    for (let item of this.rulesManagement) { // iterar Array regras
      for(let tag of item.tags){ // iterar array Tags dentro de Regras
        if(tag.name === term){ 
          rulesFiltered.push(item); 
        }        
      }
    }
    return rulesFiltered;
  }

  ngOnInit():void {
    
    this.filteredRulesStart = this.buidMandatoryRules(this.filteredRulesStart,'inicio de viagem');
    
  }


  // onSubmit() {
  //  if ( this.formOperation.valid ) {
  //    const operation$ = this.create(this.formOperation);
  //    const request$ = operation$.pipe(
  //          concatMap((operation : any) => (operation.value) ? this.updateOperation(operation.value) : of(operation)));
  //          request$.subscribe(operation => this.onRegister(operation) , error =>this.onError(error));
  //  }
  // }
 
  public onSubmit() {
    debugger
    const operation = {
    ...this.formOperation.value,
    rules:{
      ...this.selectedRules
    }
  }
  this
    .operationService
    .saveOperation(operation)
    .subscribe(
      success => this.onSaveSuccess(success),
      error => this.onError(error)
    );
  }
  public onSaveSuccess(operation) {
    this.formOperation.reset();
    this.onFormClose.emit(operation);
  }
 

  public updateOperation(operation) {
     return this.operationService.updateOperation(operation);
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
     this.selectedRules.push(event);
  }

  changeStartRule(event) {
    debugger
     this.selectedRuleStart = true;
     this.rulesByStartTrip = event;
     this.selectedRules.push(event);
  }

  public closeDialog = () => this.showAddrules = false;

}



