import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionClickEvent } from '../../shared/events/OptionClickEvent';


@Component({
  selector: 'sga-historic',
  templateUrl: './historic.component.html',
  styles: []
})
export class HistoricTripsComponent implements OnInit {
@Input() trips = new Array();
@Input() dataLoading = true;

 public text: any;
 public distance: any;
 public motorist: any;
 public placeText: any;
 public styleClass: any;
 public stepIndex: number;
 public selectedTrip: any;
 public filterLocation: any;
 public filterDistance: any;
 public showTripDialog = false;
 public showSummaryDialog = false;
 public showColumnSelector = false;
 public haveFooter = true;
 public showSendDialog = false;
 public showMessageDialog = false;
 public showNonConformityDialog = false;
 public headers = new Array<string>();
 public filterHeaders = new Array<string>();


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

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => this.trips = data.trips);
  }

  /* SUMMARY EVENTS */
  public summaryDialogClose() {
    this.showSummaryDialog = false;
  }
  public updateSelectedTrip(event) {
    this.selectedTrip = event.data;
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
    }


   }

  public onPlacesFiltered(event) {
    this.filterDistance = event.distance;
    this.filterLocation = { lat: event.lat, lng: event.lng };
  }

  public onPlacesFilterRemoved() {
    this.filterDistance = null;
    this.filterLocation = null;
  }
  
  public sendDialogClose = () => this.showSendDialog = false;
  public messageDialogClose = () => this.showMessageDialog = false;
  public nonConformityDialogClose = () => this.showNonConformityDialog = false;

 
  public onPlacesKeyUp() {}

  public onDistanceKeyUp() {}

  public whenHeaderReady = headers => this.headers = headers;

  public onToggleItem = itemsSelected => this.filterHeaders = itemsSelected;
}
