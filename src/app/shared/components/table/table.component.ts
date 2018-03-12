/**
 * Created by davidherod on 15/3/17.
 */
import {
  Component,
  Input,
  TemplateRef,
  ContentChild,
  forwardRef,
  Inject,
  ViewChild,
  OnChanges,
  AfterViewInit,
  ChangeDetectorRef,
  DoCheck,
  ElementRef,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { SearchPipe } from '../../filters/search.pipe';
import { DomHandler } from '../../../motorist/dom-handler/domhandler.service';

@Component({
  selector: `data-table`,
  providers: [DomHandler],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class DataTableComponent implements DoCheck, OnChanges, AfterViewInit {
  @Input() data: Array<any>;
  @Input() bodyTop;
  @Input() bodyBottom;
  @Input() dataLength: number;
  @Input() searchText: string;
  @Input() emptySearchText: string;
  @Input() searchColumns: Array<any>;
  @Input() styleHeader: string = 'ui-datatable-header';
  @Input() styleBody: string = 'ui-datatable-body';
  @Input() styleRow: string = 'ui-datatable-body-row';
  @Input() styleFooter: string = 'ui-datatable-footer';
  @Input() stylePager: string = 'ui-table-pager';
  @Input() contextMenuMode: string = 'click';
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onRowRightClick: EventEmitter<any> = new EventEmitter();
  @Output() onCellClick: EventEmitter<TableClickEvent> = new EventEmitter();
  @Output() onCellRightClick: EventEmitter<any> = new EventEmitter();
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
  columns: ColumnComponent[] = [];
  currentPage: number = 1;
  pageQuantity: number = 10;
  search: SearchPipe;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public domhandler: DomHandler
  ) {
    this.search = new SearchPipe();
  }

  showStyle(x, y, contextMenu) {
    //console.log(contextMenu);
    let contextWidth = contextMenu.offsetWidth;
    let contextHeight = contextMenu.offsetHeight;

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

    // original measurements
    //return {'top': (contextMenu.y - 8)  + 'px', 'left' : (contextMenu.x - 8) + 'px'};
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

  addColumn(column) {
    this.columns.push(column);
  }

  setEmptyView(emptyView: EmptyTableComponent) {
    this.emptyView = emptyView;
  }

  setContextMenu(contextMenu: ContextMenuComponent) {
    this.contextMenu = contextMenu;
  }

  cellClick(event) {
    //fixme 6/6/17
    event.event.stopPropagation();
    this.onClick();
    this.onCellClick.emit(
      new TableClickEvent(event, event.cellIndex, event.rowIndex, event.row)
    );
    this.showContextMenu(event.cellIndex, event.rowIndex, 'click', event.event);
  }

  cellRightClick(event) {
    //fixme 6/6/17
    //event.event.stopPropagation();
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
        //Todo: Added && this.bodyElement != null due to null error potentially caused by *ngif on table element displaying
        this.columns[i].headerWidth = this.bodyRowElement.nativeElement.cells[
          i
        ].offsetWidth;
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
    if (this.searchColumns == null || this.searchColumns.length == 0) {
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

  ngDoCheck() {
    if (this.bodyRowElement != null) {
      this.setHeaderColumnWidth();
    }
  }

  ngOnChanges() {
    // set header width
    if (this.bodyRowElement != null) {
      this.setHeaderColumnWidth();
    } else if (this.data != null && this.data.length > 0) {
      this.changeDetector.detectChanges();
    }

    // filterData
    this.filteredData = new SearchPipe().transform(this.data, [
      this.searchText,
      this.searchColumns
    ]);
    if (this.filteredData.length == 0) {
      this.emptyTable = true;
      this.changeDetector.detectChanges();
    } else {
      this.emptyTable = false;
      this.changeDetector.detectChanges();
    }
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
  selector: `column`,
  template: ``
})
export class ColumnComponent {
  @Input() public key;
  @Input() public header;
  @Input() public width;
  @Input() public fixedWidth;
  @Input() public minWidth;
  @Input() public headerWidth;
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  constructor(
    @Inject(forwardRef(() => DataTableComponent))
    public dataTable: DataTableComponent
  ) {
    dataTable.addColumn(this);
  }
}

@Component({
  selector: `table-empty`,
  template: ``
})
export class EmptyTableComponent {
  @ContentChild(TemplateRef) public template: TemplateRef<any>;

  constructor(
    @Inject(forwardRef(() => DataTableComponent))
    public dataTable: DataTableComponent
  ) {
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
  hidden: boolean = true;
  x: number;
  y: number;

  constructor(
    @Inject(forwardRef(() => DataTableComponent))
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
  @Input() enabled: boolean = true;
  @ContentChild(TemplateRef) public template: TemplateRef<any>;

  constructor(
    @Inject(forwardRef(() => ContextMenuComponent))
    public contextMenu: ContextMenuComponent
  ) {
    contextMenu.addMenuItem(this);
  }
}
