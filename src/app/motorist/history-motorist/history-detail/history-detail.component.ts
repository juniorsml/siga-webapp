
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Router } from '@angular/router';



@Component({
  selector: 'sga-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})

export class HistoryDetailComponent implements OnInit {

  @Input() showHistoryDetail: boolean;
  @Input() selectedMotorist: any;

  @Output() public onBackButton = new EventEmitter<string>();

  constructor(private _router: Router) { }

  public onBack() {
    this.showHistoryDetail = false;
    this.onBackButton.emit();
    this._router.navigateByUrl('motorist/history');

  }
   ngOnInit() {

  }
}
