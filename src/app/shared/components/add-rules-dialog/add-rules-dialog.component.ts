import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { rules } from '../../../shared/mocks/rules';

import 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'sga-add-rules-dialog',
  templateUrl: './add-rules-dialog.component.html',
  styleUrls: ['./add-rules-dialog.component.scss']
})

export class AddRulesDialogComponent implements OnInit{
   public filteredData = [];
   term: FormControl = new FormControl(); // form control of text input

  public rulesManagement = rules;

  public addedItem = false;
  

  termSubscription; 

  public selectedRules = new Array<any>();
  public addedClass = false;
  public removedClass = false;

  @Input() showModal: boolean;
  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() data: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit() {     
     // generate initial display array
     this.filteredData = this.rulesManagement;
     this.termSubscription = this.term.valueChanges // event emitter that fires when formControl value changes
       .debounceTime(400) // only continue sequence if event has not emitted in the past 400 milliseconds
       .distinctUntilChanged() // only continue sequence if value has changed from last event emit
       .subscribe(
         term => {
             // determine filterBy value
             const filterBy = term ? term.toLowerCase() : null;
             // do case insensitive search
             const filteredData = filterBy
               ? this.rulesManagement.filter(item => (item.name.toLowerCase().indexOf(filterBy) !== -1))
          
               : this.rulesManagement;
             // generate display array
             this.filteredData = filteredData;
           }
       ) 
     }
  cancel() {
    this.showModal = false;
    this.onDialogClose.emit();
  }

  public toggleItem(item , i) {

    if (!this.selectedRules.includes(item)) {
       debugger 
       this.selectedRules.push(item);
       item.addedItem = true;
    }
     else {
       this.selectedRules.splice(i, 1);    
       item.addedItem = false;
     }
  }


  confirm() {
    this.showModal = false;
    if (this.selectedRules) {
      this.data.emit(this.selectedRules);
    }  
  }
}
