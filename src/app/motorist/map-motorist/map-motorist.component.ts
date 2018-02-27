import { 
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import {} from "leaflet-marker-cluster"

import { Map } from '../../shared/models/Map';

@Component({
  selector: 'sga-map-motorist',
  templateUrl: './map-motorist.component.html'
})
export class MapMotoristComponent implements OnInit {
  @ViewChild('mapSelector') mapSelector: ElementRef;
  
  constructor(private map: Map) { }
  
  ngOnInit(): void {
    this.injectMap();
  }

  private injectMap(): void {
    debugger;
    this.map.append(this.mapSelector.nativeElement);
    this.map.setZoom(12)
  }
}
