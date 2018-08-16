import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionClickEvent } from '../../../shared/events/OptionClickEvent';



@Component({
  selector: 'sga-radar',
  templateUrl: './radar.component.html',
  styles: []
})
export class RadarComponent implements OnInit {
@Input() trips = new Array();
  @Input() dataLoading = true;

  public text: any;
  public distance: any;
  public placeText: any;
  public filterLocation: any;
  public filterDistance: any;
  public showColumnSelector = false;
  public haveFooter = true;
  public styleClass: any;
  public stepIndex: number;     
  public selectedTrip: any;
  public showTripDialog = false;
  public showSummaryDialog = false;
  public showSendDialog = false;
  public showMessageDialog = false;
  public showNonConformityDialog = false;
  public showConfirmDialog = false;
  public type: any;  


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

  public headers = new Array<string>();
  public filterHeaders = new Array<string>();

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => this.trips = data.trips);
  }


  public onPlacesFiltered(event) {
    this.filterDistance = event.distance;
    this.filterLocation = { lat: event.lat, lng: event.lng };
  }

  public onPlacesFilterRemoved() {
    this.filterDistance = null;
    this.filterLocation = null;
  }
  public contextMenuSelected(index) {

    switch (index) {
     case 0:
        this.stepIndex = index;
        this.showSummaryDialog = true;
      break;
     case 1: 
        this.stepIndex = index;
        this.showSummaryDialog = true;
    break;
     case 2:
        this.stepIndex = index;
        this.showSummaryDialog = true;
    break;
     case 3:
        this.stepIndex = index;
        this.showSummaryDialog = true;
    break;
      case 4:
        this.showSendDialog = true;
     break;
      case 5:
        this.showMessageDialog = true;
        break;
       case 6:
         this.showNonConformityDialog = true;
     break;
       case 7:
         this.showConfirmDialog = true;
         this.type = 'CTO';    
     break;
       case 8:
         this.showConfirmDialog = true;
         this.type = 'RATC';

     }
  }
  public summaryDialogClose() {
    this.showSummaryDialog = false;
  }

  public onConfirm() {
    this.showNonConformityDialog = true;
    this.confirmDialogClose();
  }

  public updateSelectedTrip(event) {
      this.selectedTrip = event.data;
    }


  public sendDialogClose = () => this.showSendDialog = false;
  public messageDialogClose = () => this.showMessageDialog = false;
  public nonConformityDialogClose = () => this.showNonConformityDialog = false;
  public confirmDialogClose = () => this.showConfirmDialog = false;




  public onPlacesKeyUp() {}

  public onDistanceKeyUp() {}


  public whenHeaderReady = headers => this.headers = headers;

  public onToggleItem = itemsSelected => this.filterHeaders = itemsSelected;
}
