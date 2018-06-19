import { Component, Input } from '@angular/core';

@Component({
  selector: 'sga-map',
  template: `
    <div id="map"></div>
    <div *ngIf="showPolygonSquare" id="calculation-box">
      <div id="calculated-area"></div>
    </div>
  `,
  styles: [`
    #map{
      z-index: 0;
    }
    #calculation-box {
      height: 100px;
      width: 200px;
      position: absolute;
      bottom: 40px;
      left: 10px;
      background-color: rgba(255, 255, 255, .9);
      padding: 15px;
      text-align: center;
      z-index: 10;
      border-radius: 7px;
      transition: ease 1s;
      opacity: 0;
    }

    p {
      font-family: 'Open Sans';
      margin: 0;
      font-size: 13px;
    }
  `]
})
export class MapComponent {
  @Input() public showPolygonSquare: boolean;
}
