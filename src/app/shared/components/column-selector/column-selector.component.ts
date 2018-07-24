import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
  OnInit
} from '@angular/core';

@Component({
  selector: 'sga-column-selector',
  templateUrl: './column-selector.component.html',
  styleUrls: ['./column-selector.component.scss']

})
export class ColumnSelectorComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() public columns = new Array<string>();

  @Output() public onClose = new EventEmitter();
  @Output() public onToggleItem = new EventEmitter<Array<any>>();

  private selectedItems = new Array<string>();

  ngOnInit(): void {
    if (Array.isArray(this.columns)) { this.updateSelectedItems(); }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.columns.isFirstChange()) { this.updateSelectedItems(); }
  }

  ngAfterViewInit(): void {
    const cols = this.getSavedColumns();
    this.selectedItems = Object.assign([], cols ? cols : this.columns);
    setTimeout(() => this.onToggleItem.emit(this.selectedItems), 100);
  }

  public closeBox = (event) => {
    if (event === 'hide') { this.onClose.emit(); }
  }

  public onToggle(column: string): void {
    if (this.selectedItems.find(c => c === column)) {
      this.removeFromSelectedItems(column);
    } else {
      this.addToSelectedItems(column);
    }
    this.onToggleItem.emit(this.selectedItems);
    setTimeout(() => this.saveColumns(this.selectedItems), 1000);
  }

  private updateSelectedItems = () => {
    const cols = this.getSavedColumns();
    this.selectedItems = Object.assign([], cols ? cols : this.columns);
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

  public columnInPreferences = column => {
    const key = this.getPageKey();
    const savedColumns = JSON.parse(localStorage.getItem(key));
    if (savedColumns == null) { return true; }
    const colExists = savedColumns.findIndex(col => col === column);
    return colExists >= 0;
  }

  private saveColumns = items => {
    const key = this.getPageKey();
    localStorage.setItem(key, JSON.stringify(items));
    return false;
  }

  private getSavedColumns = () => JSON.parse(localStorage.getItem(this.getPageKey()));

  private getPageKey = () => window.location.href.split('/')[4];
}
