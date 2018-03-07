import { 
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import {} from "leaflet-marker-cluster"

import { Map } from '../../shared/models/Map';
import { TabComponent } from '../../shared/components/tabs/tab/tab.component';

@Component({
  selector: 'sga-map-motorist',
  templateUrl: './map-motorist.component.html',
  styleUrls: ['./map-motorist.component.scss']
})
export class MapMotoristComponent implements OnInit {

  @ViewChild('mapSelector') mapSelector: ElementRef;
  @Input('motorists') motorists = new Array();
  
  mapLocationHistory = new Array();

  mapSearchText: any;
  mapSelectedTabIndex: number;
  mapTabsSelectedIndex: number = 0;

  constructor(private map: Map) { }
  
  ngOnInit(): void {
    this.injectMap();
  }

  onMapTabChanged(tab: TabComponent) {
    this.mapSelectedTabIndex = tab.index;
    switch (tab.index) {
        // case 0:
        //     this.plotMotoristLocations();
        //     break;
        // case 1:
        //     this.plotHistoryLocations();
        //     break;
    }
}

onMapTabSelected(tab: TabComponent) {
    this.mapTabsSelectedIndex = tab.index;
}

  private injectMap(): void {
    this.map.createMapBoxMapInstance(this.mapSelector.nativeElement);
  }
}
