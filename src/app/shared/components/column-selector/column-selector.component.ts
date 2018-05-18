import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
  selector: 'sga-column-selector',
  templateUrl:'./column-selector.component.html',
  styleUrls: ['./column-selector.component.scss']
   
})
export class ColumnSelectorComponent implements OnChanges, OnInit {
  
  @Input() public columns = new Array<string>();
  
  @Output() public onClose = new EventEmitter();
  @Output() public onToggleItem = new EventEmitter<Array<any>>();
  
  private selectedItems = new Array<string>();
  
  ngOnInit(): void {
    if (Array.isArray(this.columns)) this.updateSelectedItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.columns.isFirstChange()) this.updateSelectedItems();
  }
  
  public closeBox = (event) => {
    if (event === 'hide') this.onClose.emit();
  }

  public exists = (column: string) => this.selectedItems.find(a => a === column);

  public onToggle(column: string): void {
    if (this.selectedItems.find(c => c === column))
      this.removeFromSelectedItems(column);
    else
      this.addToSelectedItems(column)

    this.onToggleItem.emit(this.selectedItems);
  }

  private updateSelectedItems = () => this.selectedItems = Object.assign([], this.columns);

  private removeFromSelectedItems(column: string) {
    const index = this.selectedItems.indexOf(column);
    this.selectedItems.splice(index, 1);
    this.selectedItems = Object.assign([], this.selectedItems);
  }

  private addToSelectedItems(column: string) {
    this.selectedItems.push(column);
    this.selectedItems = Object.assign([], this.selectedItems);
  }
}
