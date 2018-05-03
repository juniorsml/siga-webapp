import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Map } from '../../../shared/models/Map';

@Component({
  selector: 'sga-summary-itinerary',
  templateUrl: './summary-itinerary.component.html',
  styleUrls: ['./summary-itinerary.component.scss']
})

export class SummaryItineraryComponent implements OnInit {

  @ViewChild('containerMap') containerMap: ElementRef;

  constructor(private map: Map) { }

  ngOnInit(): void {
    this.injectMap();
  }

  private injectMap(): void {
    this.map.createMapBoxMapInstance(this.containerMap.nativeElement);
  }


}

 