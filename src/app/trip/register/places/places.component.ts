import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';

import { Map } from '../../../shared/models/Map';
import { DirectionService } from '../../../shared/services/direction.service';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';
import { TripObject } from '../../../shared/services/trip-object.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'sga-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  providers:[TripObject]
})
export class PlacesComponent implements OnInit {

  public places = new Array<any>();
  public route: any;
  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;
  hour=[/[0-9]/, /\d/, ':', /\d/, /\d/];


  @ViewChild('timeStart') timeStart: any;
  @ViewChild('timeEnd') timeEnd: any;
  @ViewChild('hourStart') hourStart: any;
  @ViewChild('hourEnd') hourEnd: any;


  currentTime = new Date();
  month = this.currentTime.getMonth() + 1;
  day = this.currentTime.getDate();
  year = this.currentTime.getFullYear();

 
 
  public placeObj = [];
  public state;
  public itineraryInfo;

  constructor(private map: Map, private directionService: DirectionService, private formItinerary: TripObject) { }

  ngOnInit(): void {
    this.injectMap();
    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      alwaysVisible: false,
      gridOpacity: '0.2',
      barOpacity: '0.5',
      gridBackground: '#ccc',
      gridWidth: '5',
      gridMargin: '2px 2px',
      barBackground: 'rgba(55, 56, 58, 0.6)',
      barWidth: '4',
      barMargin: '2px 2px'
    };
  }
  ngOnDestroy(){
    for(let item of this.places){
      this.placeObj.push(item.nameToRoute);
    }
    this.itineraryInfo = {
        name: this.placeObj,
        timeStart: this.timeStart.selectionDayTxt + ' - ' + this.hourStart.nativeElement.value,
        timeEnd: this.timeEnd.selectionDayTxt + ' - ' + this.hourEnd.nativeElement.value
        
    }
  
    this.formItinerary.updateObj(this.itineraryInfo,'itinerary');
    console.log(this.itineraryInfo);
    
   
  }
  
  public setStart: IMyDpOptions = {
    disableUntil: {year: this.year, month: this.month, day: this.day},
    dateFormat: 'dd/mm/yyyy',
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
    dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sáb'},
    todayBtnTxt: 'Hoje'
  };

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
   debugger
    this.setEnd.disableUntil.year = event.date.year;
    this.setEnd.disableUntil.month = event.date.month;
    this.setEnd.disableUntil.day = event.date.day;

    }

  public setEnd: IMyDpOptions = {
    disableUntil: {year: this.year, month: this.month, day: this.day},
    dateFormat: 'dd/mm/yyyy',
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
    dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sáb'},
    todayBtnTxt: 'Hoje'
  };


  public selectPlace = place => {

    const location = {
      name: place.formatted_address,
      nameToRoute: place.address_components
      .filter(obj => obj.types.includes('administrative_area_level_2') )
      .map(obj =>  obj.long_name)[0],
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      
    };

    this.places.push(location);
    this.plotRoute();
    this.moveMap(location.lat, location.lng, 15);
  }

  public addPlace = item => console.log(item);

  public removePlace = item => {
    const index = this.places.findIndex(a => a === item);
    this.places.splice(index, 1);
    this.plotRoute();
  }

  public revertPlaces = () => {
    this.places = this.places.reverse();
    this.plotRoute();
  }

  private moveMap = (lat: number, lng: number, zoom = 7) => {
    this.map.setZoom(zoom);
    this.map.setCenter(lat, lng);
  }

  private plotRoute = () => {
    if (this.places.length > 1) {
      this.map.clearAll();
      this.places.map(this.addPoint);
      this.directionService
        .getCoordinates(this.places)
        .subscribe(
          data => this.onSuccessRoute(data),
          error => console.log(error));
    }
  }

  private onSuccessRoute = ({ routes }) => {
    const { geometry, distance, duration } = routes[0];
    this.route = { distance: this.formatToKm(distance), duration: this.formatDate(duration) };

    const featureList = this.directionService.decode(geometry);
    const latLngs = featureList.map(feat => L.latLng(feat.geometry.coordinates[1], feat.geometry.coordinates[0]));
    this.map.drawPolyline(latLngs);
  }

  private formatToKm = meters => (meters / 1000).toFixed(1);

  private formatDate = seconds => {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  private injectMap = () => this.map.createMapBoxMapInstance();

  private addPoint = place => this.map.addCircle(L.latLng(place.lat, place.lng));
}
