import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'sga-register-operation',
  templateUrl: './register-operation.component.html',
  styleUrls: ['./register-operation.component.scss']
})
export

 class RegisterOperationComponent {


  showAddrules = false;

  @Input()
  public showForm: boolean;
  @Output() onFormClose: EventEmitter<any> = new EventEmitter();


  public selectedTabIndex = 0;

  public onRulesSelected: any;

  public selectedRules: any;

  public onSubmit(formOperation: NgForm) {
    const {} = formOperation.value;
    this.onFormClose.emit();
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



