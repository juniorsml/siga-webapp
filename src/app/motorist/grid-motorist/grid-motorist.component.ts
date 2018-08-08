import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { TableClickEvent } from '../../shared/components/table/table.component';
import { OptionClickEvent } from '../../shared/events/OptionClickEvent';
import { MotoristService } from '../motorist.service';
import { Motorist } from '../../shared/models/api/Motorist';

@Component({
  selector: 'sga-grid-motorist',
  templateUrl: './grid-motorist.component.html',
  styleUrls: ['./grid-motorist.component.scss'],
  providers: [MotoristService]
})
export class GridMotoristComponent implements OnInit {

  public text: any;
  public distance: any;
  public motorist: any;
  public placeText: any;
  public styleClass: any;
  public filterLocation: any;
  public filterDistance: any;
  public selectedMotorist: any;

  public showDialog = false;
  public showMotoristDialog: boolean;
  public showColumnSelector = false;
  public showSendDialog = false;
  public showSendCommandDialog = false;


  public headers = new Array<string>();
  public motorists = new Array<Motorist>();
  public filterHeaders = new Array<string>();

  constructor(
    private router: Router,
    private motoristService: MotoristService) { }

  ngOnInit(): void {
    this.getMotorists();
  }

  private getMotorists() {
    this
      .motoristService
      .getMotorists()
      .subscribe(
        data => this.onSuccess(data),
        error => alert(error));
  }

  private onSuccess(data) {
    this.motorists = data;
  }

  onSelectOption(event: OptionClickEvent) {
    switch (event.data.header) {
      case 'Seleção de Colunas':
        this.showColumnSelector = true;
        break;
      case 'Configuração':
        this.router.navigateByUrl('motorist/account');
        break;
    }
  }

  public onCellClick(event) {
    this.selectedMotorist = event.data;
    if (event.cellIndex === 0) { this.showMotoristDialog = true; }
  }

  public onPlacesFiltered(event) {
    this.filterDistance = event.distance;
    this.filterLocation = { lat: event.lat, lng: event.lng };
  }

  public onPlacesFilterRemoved() {
    this.filterDistance = null;
    this.filterLocation = null;
  }

  public contextMenuSelected = event => {
    switch (event) {
      case 1:
        this.router.navigateByUrl(`motorist/history/${this.selectedMotorist.id}`);
       break;
      case 4:
        this.showSendCommandDialog = true;
        this.showSendDialog = true;
     }
  }

  public onCellRightClick = (event: TableClickEvent) => this.selectedMotorist = event.data;

  public closeColumnSelector = () => this.showColumnSelector = false;

  public showMotoristModal = () => this.showMotoristDialog = true;

  public motoristDialogClose = () => this.showMotoristDialog = false;

  public sendDialogClose = () => this.showSendDialog = false;

  public whenHeaderReady = headers => this.headers = headers;

  public onToggleItem = itemsSelected => this.filterHeaders = itemsSelected;
}
