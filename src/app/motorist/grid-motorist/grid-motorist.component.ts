import { Component, Input,Output, OnInit,EventEmitter } from '@angular/core';
import { TableClickEvent } from '../../shared/components/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionClickEvent } from '../../shared/events/OptionClickEvent';

@Component({
  selector: 'sga-grid-motorist',
  templateUrl: './grid-motorist.component.html',
  styleUrls: ['./grid-motorist.component.scss']
})
export class GridMotoristComponent implements OnInit {
  @Input() motorists = new Array();
  @Input() dataLoading: boolean = true;
  @Input() haveFooter: boolean = true;
  @Output() onMotoristSelected: EventEmitter<any> = new EventEmitter();


  text: any;
  distance: any;
  motorist: any;
  placeText: any;
  styleClass: any;
  filterLocation: any;
  filterDistance: any;
  selectedMotorist: any;

  showDialog = false;
  showMotoristDialog: boolean;
  showColumnSelector = false;

  public headers = new Array<string>();
  public filterHeaders = new Array<string>();

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.motorists = data.motorists);
  }

  closeColumnSelector() {
    this.showColumnSelector = false;
  }

  onSelectOption(event: OptionClickEvent) {
    switch (event.data.header) {      
      case 'Seleção de Colunas': 
        this.showColumnSelector = true;
        break;
    }
  }

  public onCellClick(event) {
    this.selectedMotorist = event.data;
    if (event.cellIndex === 0) this.showMotoristDialog = true;
  }

  public onCellRightClick(event: TableClickEvent) {
    this.selectedMotorist = event.data;
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
    }
  }

  public showMotoristModal = () => this.showMotoristDialog = true;

  public motoristDialogClose = () => this.showMotoristDialog = false;

  public whenHeaderReady = headers => this.headers = headers;

  public onToggleItem = itemsSelected => this.filterHeaders = itemsSelected;
}
