import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'sga-column-selector',
  template: `
    <div class="box">
      <h3>Selecione as colunas:</h3>
      <ul>
        <li *ngFor="let column of columns">
          <label class="checkbox">
            <input type="checkbox" checked="exists(column)" (click)="onToggle(column)"/> {{column}}
          </label>
        </li>
      </ul>
    </div>`,
  styles: [`
    .box {
      z-index: 99999 !important;
      position: absolute;
      padding: 0 1em;
      right: 0;
      background-color: #FFF;
      border-radius: 1em;
    }
  `] 
})
export class ColumnSelectorComponent implements OnChanges {
  
  @Input() public columns = new Array<string>();
  @Output() public onToggleItem = new EventEmitter<Array<any>>();

  private selectedItems = new Array<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns.isFirstChange() === false)
      this.selectedItems = Object.assign([], this.columns);
  }

  public exists = (column: string) => this.selectedItems.find(a => a === column);

  public onToggle(column: string): void {
    if (this.selectedItems.find(c => c === column))
      this.removeFromSelectedItems(column);
    else
      this.addToSelectedItems(column)

    this.onToggleItem.emit(this.selectedItems);
  }

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
