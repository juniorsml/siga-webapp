import {
    Component, OnChanges, Output, Input, EventEmitter, DoCheck
} from '@angular/core';

@Component({
  selector: 'sga-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements DoCheck, OnChanges {

    @Output('pageChange') public pageChanged: EventEmitter<any>;
    @Input('pageQuantity') public pageQuantity;
    @Input('data') public data;
    @Input('styleClass') public styleClass = 'ui-table-pager';
    public selectedPage;
    public pager;
    public previousPageQuantity;

    constructor() {
        this.selectedPage = 1;
        this.pager = [];
        this.pageChanged = new EventEmitter();
        this.setPager();
    }

    onPageClick(index) {
        this.selectedPage = index;
        this.setPager();
        this.pageChanged.emit(index);
    }

    setPager() {

        this.pager = [];
        let length = this.data == null ? 0 : this.data.length;
        let pages = Math.ceil(length / this.pageQuantity);

        if (pages <= 7) {
            for (var i = 0; i < pages; i++) {
                this.pager[i] = i + 1;
            }
        } else if (this.selectedPage <= (pages / 2)) {

            for (var i = 0; i < 5; i++) {
                this.pager[i] = i + 1;
            }
            this.pager[i] = '...';
            this.pager[i + 1] = pages;
        } else {
            this.pager[0] = 1;
            this.pager[1] = '...';
            this.pager[2] = pages - 4;
            this.pager[3] = pages - 3;
            this.pager[4] = pages - 2;
            this.pager[5] = pages - 1;
            this.pager[6] = pages;

        }

    }

    previousPage() {
        if (this.data == null) {
            return;
        } else if (this.selectedPage != 1) {
            this.selectedPage--;
            this.setPager();
            this.pageChanged.emit(this.selectedPage);
        }
    }

    nextPage() {
        let length = this.data == null ? 0 : this.data.length;
        if (length == 0) {
            return;
        } else if (this.selectedPage != Math.ceil(length / this.pageQuantity)) {
            this.selectedPage++;
            this.setPager();
            this.pageChanged.emit(this.selectedPage);
        }
    }

    onQuantityChange() {
        let length = this.data == null ? 0 : this.data.length;
        let pages = Math.ceil(length / this.pageQuantity);

        if (this.previousPageQuantity != null && this.previousPageQuantity != this.pageQuantity) {


            let firstItem = (this.selectedPage) * this.previousPageQuantity;
            let page = Math.ceil(firstItem / this.pageQuantity);

            if (page > pages) {
                this.selectedPage = pages;
            } else {
                this.selectedPage = page;
            }

            this.previousPageQuantity = this.pageQuantity;
        }
        if (this.pageQuantity != null) {
            this.previousPageQuantity = this.pageQuantity;
        }


    }

    ngDoCheck() {
        this.onQuantityChange();
        this.setPager();
    }

    ngOnChanges() {
        /* console.log('fire pager change');
         console.log('pager quantity');
         console.log(this.pageQuantity);*/
        this.onQuantityChange();
        this.setPager();
    }
}
