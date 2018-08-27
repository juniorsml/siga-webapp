import { Component, EventEmitter, Output, Input, SimpleChanges,ChangeDetectorRef } from '@angular/core';

import { rules } from '../../../shared/mocks/rules';

import { SearchPipe } from '../../../shared/filters/search.pipe';

@Component({
  selector: 'sga-add-rules-dialog',
  templateUrl: './add-rules-dialog.component.html',
  styleUrls: ['./add-rules-dialog.component.scss']
})
export class AddRulesDialogComponent {
  public filteredData:any;
  public searchText : any;
  search: SearchPipe;
  public rulesManagement = rules; 

  public selectedRules = new Array<any>();
  public addedClass = false;
  public removedClass = false;

  @Input() showModal: boolean;
  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  constructor(private changeDetector: ChangeDetectorRef) {}
 ngOnInit() {
    this.filteredData = new SearchPipe().transform(this.rulesManagement, [
      this.searchText
    ]);

 }
  ngOnChanges(changes: SimpleChanges): void {  
    
    if (changes.searchText) {
      this.filteredData = new SearchPipe().transform(this.rulesManagement, [
        this.searchText
      ]);
  
    } else {
      this.filteredData = this.rulesManagement;
    }
    this.changeDetector.detectChanges();
  }

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
    if(this.selectedRules){
      this.data.emit(this.selectedRules);  
    }
    
  }
}
