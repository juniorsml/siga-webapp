import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Map } from '../../../shared/models/Map';

@Component({
  selector: 'sga-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  @ViewChild('mapSelector') mapSelector: ElementRef;

  constructor(private map: Map) { }

  ngOnInit(): void {
    this.injectMap();
  }

  private injectMap(): void {
    this.map.createMapBoxMapInstance(this.mapSelector.nativeElement);
  }
}
