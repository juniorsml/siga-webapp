/**
 * Created by davidherod on 8/2/17.
 */
import {
  Component,
  ContentChild,
  TemplateRef,
  Input,
  Inject,
  forwardRef
} from '@angular/core';

@Component({
  selector: `list-view`,
  template: `
        <ul [ngClass]="'ui-listview'" [class]="styleClass">
            <li class="ui-listview-item" *ngFor="let listItem of listItems; let i = index">
                <ng-template [ngTemplateOutletContext]="{item: listItem, index: i}"
                             [ngTemplateOutlet]="item.template"></ng-template>
            </li>
            <li class="list-view-empty"
                *ngIf="empty != null && empty.template != null && listItems == null
                || empty != null && empty.template != null && listItems != null && listItems.length == 0">
                <ng-template [ngTemplateOutlet]="empty.template"></ng-template>
            </li>
        </ul>`,
  styleUrls: ['./listview.component.scss']
})
export class ListViewComponent {
  @Input() styleClass: string;
  @Input() emptyMessage: string;
  @Input() listItems: Array<any> = [];

  public item: ListViewItemComponent;
  public empty: ListViewEmptyComponent;

  setItem(item: ListViewItemComponent) {
    this.item = item;
  }

  setEmpty(empty: ListViewEmptyComponent) {
    this.empty = empty;
  }
}

@Component({
  selector: `list-view-item`,
  template: ``
})
export class ListViewItemComponent {
  @ContentChild(TemplateRef) public template: TemplateRef<any>;

  constructor(
    @Inject(forwardRef(() => ListViewComponent))
    public listView: ListViewComponent
  ) {
    listView.setItem(this);
  }
}

@Component({
  selector: `list-view-empty`,
  template: ``
})
export class ListViewEmptyComponent {
  @ContentChild(TemplateRef) public template: TemplateRef<any>;

  constructor(
    @Inject(forwardRef(() => ListViewComponent))
    public listView: ListViewComponent
  ) {
    listView.setEmpty(this);
  }
}
