/**
 * Created by davidherod on 15/3/17.
 */
import {
  Component,
  Input,
  TemplateRef,
  ContentChild,
  ViewChild,
  OnChanges,
  AfterViewInit,
  ChangeDetectorRef,
  DoCheck,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  SimpleChanges,
  OnInit,
  AfterContentInit
} from '@angular/core';
import { SearchPipe } from '../../filters/search.pipe';

import { DomHandler } from '../../../motorist/dom-handler/domhandler.service';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';

@Component({
  selector: `data-table`,
  providers: [DomHandler],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class DataTableComponent
  implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterContentInit {
  @Input() data: Array<any>;
  @Input() bodyTop;
  @Input() bodyBottom;
  @Input() dataLength: number;
  @Input() numberShow: number;
  @Input() searchText: string;
  @Input() emptySearchText: string;
  @Input() searchColumns: Array<any>;
  @Input() styleHeader = 'ui-datatable-header';
  @Input() styleBody = 'ui-datatable-body';
  @Input() styleRow = 'ui-datatable-body-row';
  @Input() styleFooter = 'ui-datatable-footer';
  @Input() styleTableBody = 'ui-datatable-body-table';
  @Input() stylePager = 'ui-table-pager';
  @Input() contextMenuMode = 'click';
  @Input() haveFooter: true;
  @Input() filterHeaders = new Array<string>();
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onRowRightClick: EventEmitter<any> = new EventEmitter();
  @Output() onCellClick: EventEmitter<TableClickEvent> = new EventEmitter();
  @Output() onCellRightClick: EventEmitter<any> = new EventEmitter();
  @Output() whenHeaderReady = new EventEmitter<any>();

  @ViewChild('headerElement') headerElement: ElementRef;
  @ViewChild('bodyElement') bodyElement: ElementRef;
  @ViewChild('bodyRowElement') bodyRowElement: ElementRef;
  @ViewChild('footerElement') footerElement: ElementRef;
  @ViewChild('contextMenuContainer') contextMenuContainer: ElementRef;

  selectedRowIndex: number;
  contextMenu: ContextMenuComponent;
  emptyView: EmptyTableComponent;
  filteredData: Array<any>;
  emptyTable: boolean;

  private _columns = new Array<ColumnComponent>();
  private _originalColumns = new Array<ColumnComponent>();

  currentPage = 1;
  pageQuantity = 10;
  search: SearchPipe;
  sortableColumns = new Array<string>();

  // Scroll Component
  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public domhandler: DomHandler
  ) {
    this.search = new SearchPipe();
  }

  ngOnInit() {
    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      alwaysVisible: true,
      gridOpacity: '0.2',
      barOpacity: '0.5',
      gridBackground: '#ccc',
      gridWidth: '6',
      gridMargin: '2px 2px',
      barBackground: 'rgba(55, 56, 58, 0.6)',
      barWidth: '5',
      barMargin: '2px 2px'
    };
    this.filteredData = new SearchPipe().transform(this.data, [
      this.searchText,
      this.searchColumns
    ]);

    if (this.searchText == null) {
      this.numberShow = 10;
    }

    this._originalColumns = Object.assign([], this.columns);
  }

  ngDoCheck() {
    if (this.bodyRowElement != null) {
      this.setHeaderColumnWidth();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filterHeaders && !changes.filterHeaders.isFirstChange()) {
      this.filteredColumns = changes.filterHeaders.currentValue;
      this.columns = this._originalColumns;
    }

    if (changes.searchText && !changes.searchText.isFirstChange()) {
      this.filteredData = new SearchPipe().transform(this.data, [
        this.searchText,
        this.searchColumns
      ]);
      this.emptyTable = this.filteredData.length === 0;
    } else {
      this.filteredData = this.data;
    }

    if (this.searchText !== '') {
      this.numberShow = this.filteredData ? this.filteredData.length : 0;
    } else if (this.searchText === '' && this.filteredData.length > this.pageQuantity) {
      this.numberShow = this.filteredData.length;
    } else if (this.searchText !== '' && this.filteredData.length > this.pageQuantity) {
      this.numberShow = this.filteredData.length;
    } else {
      this.numberShow = this.pageQuantity;
    }

    if (this.bodyRowElement !== null) {
      this.setHeaderColumnWidth();
    }

    this.changeDetector.detectChanges();
  }

  ngAfterContentInit(): void {
    const headers = this.columns.map(c => c.header);
    setTimeout(() => this.whenHeaderReady.emit(headers), 500);
  }

  private get filteredColumns() {
    return this.filterHeaders;
  }

  private set filteredColumns(value: Array<any>) {
    this.filterHeaders = value;
  }

  public get columns() {
    return this._columns;
  }

  public set columns(value: Array<any>) {
    const result = value.filter(c => {
      const item = this.filteredColumns.find(f => c.header === f);
      return item !== undefined;
    });

    this._columns = result;
  }

  public isASC(header: string): boolean {
    return this.sortableColumns.indexOf(header) > -1;
  }

  existsInSortable(header: string): boolean {
    const i = this.sortableColumns.indexOf(header);
    if (i === -1) {
      this.sortableColumns.push(header);
      return false;
    } else {
      this.sortableColumns.splice(i, 1);
      return true;
    }
  }

  order(header: string, key: string, isSortable: boolean, sortField: string): void {
    if (!isSortable) { return; }
    const headerIndex = this.columns.findIndex(a => a.header === header);
    key = sortField ? sortField : key;
    if (this.existsInSortable(header)) {
      this.reverseBy(headerIndex, key);
    } else {
      this.sortBy(headerIndex, key);
    }
  }

  sortBy(index: number, key: string): void {
    const sort = (a, b) => {
      const left = this.getRowValue(a, key).toLowerCase();
      const right = this.getRowValue(b, key).toLowerCase();
      return right > left ? 1 : -1;
    };
    this.columns[index].dataTable.data.sort(sort);
    this.columns[index].dataTable.filteredData.sort(sort);
  }

  reverseBy(index: number, key: string): void {
    const reverse = (a, b) => {
      const left = this.getRowValue(a, key).toLowerCase();
      const right = this.getRowValue(b, key).toLowerCase();
      return right < left ? 1 : -1;
    };
    this.columns[index].dataTable.data.sort(reverse);
    this.columns[index].dataTable.filteredData.sort(reverse);
  }

  getRowValue(obj, prop) {
    const value = prop.split('.').reduce((agg, current) => agg ? agg[current] : agg, obj);
    return value ? value.toString() : '';
  }

  showStyle(x, y, contextMenu) {
    const contextWidth = contextMenu.offsetWidth;
    const contextHeight = contextMenu.offsetHeight;

    if (
      y + contextHeight > window.innerHeight &&
      x + contextWidth > window.innerWidth
    ) {
      return {
        top: y - contextHeight - 8 + 'px',
        left: x - contextWidth - 8 + 'px'
      };
    }
    if (y + contextHeight > window.innerHeight) {
      return { top: y - contextHeight - 8 + 'px', left: x - 8 + 'px' };
    }
    if (x + contextWidth > window.innerWidth) {
      return { top: y - 8 + 'px', left: x - contextWidth - 8 + 'px' };
    }
    return { top: y - 8 + 'px', left: x - 8 + 'px' };

  }

  @HostListener('window:resize', ['$event.target'])
  public onResize() {
    this.setHeaderColumnWidth();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick() {
    if (this.contextMenu != null && !this.contextMenu.hidden) {
      this.contextMenu.hidden = true;
      this.selectedRowIndex = null;
    }
  }

  addColumn(column: ColumnComponent) {
    this.columns.push(column);
  }

  setEmptyView(emptyView: EmptyTableComponent) {
    this.emptyView = emptyView;
  }

  setContextMenu(contextMenu: ContextMenuComponent) {
    this.contextMenu = contextMenu;
  }

  cellClick(event) {
    // fixme 6/6/17
    event.event.stopPropagation();
    this.onClick();
    this.onCellClick.emit(
      new TableClickEvent(event, event.cellIndex, event.rowIndex, event.row)
    );
    this.showContextMenu(event.cellIndex, event.rowIndex, 'click', event.event);
  }

  cellRightClick(event) {
    // fixme 6/6/17
    // event.event.stopPropagation();
    event.event.preventDefault();
    this.onCellRightClick.emit(
      new TableClickEvent(event, event.cellIndex, event.rowIndex, event.row)
    );
    this.showContextMenu(
      event.cellIndex,
      event.rowIndex,
      'right-click',
      event.event
    );
  }

  onPageChange(index) {
    this.currentPage = index;
  }

  setHeaderColumnWidth() {
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].fixedWidth == null && this.bodyRowElement != null) {
        // Todo: Added && this.bodyElement != null due to null error potentially caused by *ngif on table element displaying
        const cell = this.bodyRowElement.nativeElement.cells[i];
        this.columns[i].headerWidth = cell ? cell.offsetWidth : 0;
      } else {
        this.columns[i].headerWidth = this.columns[i].fixedWidth;
        this.columns[i].width = this.columns[i].fixedWidth;
      }
    }
  }

  setBodyColumnMinWidth() {
    for (let i = 0; i < this.columns.length; i++) {
      this.columns[i].minWidth = this.headerElement.nativeElement.cells[
        i
      ].offsetWidth;
    }
  }

  populateSearchFields() {
    if (this.searchColumns == null || this.searchColumns.length === 0) {
      this.searchColumns = [];
      for (let i = 0; i < this.columns.length; i++) {
        this.searchColumns.push(this.columns[i].key);
      }
    }
  }

  /***** Context Menu *****/

  showContextMenu(
    cellIndex: number,
    rowIndex: number,
    mode: string,
    event: any
  ) {
    if (this.contextMenu != null && this.contextMenu.mode == mode) {
      for (let i = 0; i < this.contextMenu.ignoreCells.length; i++) {
        if (cellIndex == this.contextMenu.ignoreCells[i]) {
          this.contextMenu.hidden = true;
          this.selectedRowIndex = null;
          return;
        }
      }
      this.contextMenu.x = event.x;
      this.contextMenu.y = event.y;
      this.contextMenu.hidden = false;
      this.selectedRowIndex = rowIndex;

      this.domhandler.fadeIn(this.contextMenuContainer.nativeElement, 250);
    }
  }

  contextMenuClick(event) {
    if (this.contextMenu.menuItems[event.index].enabled) {
      event.event.stopPropagation();
      this.selectedRowIndex = null;
      this.contextMenu.contextMenuSelected(event.index);
    }
  }

  ngAfterViewInit() {
    this.populateSearchFields();
  }
}

export class TableClickEvent {
  event: Event;
  cellIndex: number;
  rowIndex: number;
  data: any;

  constructor(event: Event, cellIndex: number, rowIndex: number, data: any) {
    this.event = event;
    this.cellIndex = cellIndex;
    this.rowIndex = rowIndex;
    this.data = data;
  }
}

@Component({
  selector: 'column',
  template: ``
})
export class ColumnComponent {
  @Input() public key;
  @Input() public width;
  @Input() public header;
  @Input() public minWidth;
  @Input() public sortField;
  @Input() public isSortable;
  @Input() public fixedWidth;
  @Input() public headerWidth;
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  constructor(public dataTable: DataTableComponent) {
    dataTable.addColumn(this);
  }
}

@Component({
  selector: `table-empty`,
  template: ``
})
export class EmptyTableComponent {
  @ContentChild(TemplateRef) public template: TemplateRef<any>;

  constructor(public dataTable: DataTableComponent) {
    dataTable.setEmptyView(this);
  }
}

@Component({
  selector: `context-menu`,
  template: ``
})
export class ContextMenuComponent {
  @Input() mode: string;
  @Input() ignoreCells: Array<number> = [];
  @Output() onItemSelected: EventEmitter<any> = new EventEmitter();
  @ContentChild(TemplateRef) public template: TemplateRef<any>;
  menuItems: Array<MenuItemComponent> = [];
  hidden = true;
  x: number;
  y: number;

  constructor(
    public dataTable: DataTableComponent,
    public elementRef: ElementRef
  ) {
    dataTable.setContextMenu(this);
  }

  addMenuItem(menuItem: MenuItemComponent) {
    this.menuItems.push(menuItem);
  }

  contextMenuSelected(itemIndex: number) {
    this.onItemSelected.emit(itemIndex);
    this.hidden = true;
  }
}

@Component({
  selector: `menu-item`,
  template: ``
})
export class MenuItemComponent {
  @Input() enabled = true;
  @ContentChild(TemplateRef) public template: TemplateRef<any>;

  constructor(public contextMenu: ContextMenuComponent) {
    contextMenu.addMenuItem(this);
  }
}
