import { Component, OnInit } from '@angular/core';

import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import {} from 'leaflet-marker-cluster';

import { Map } from '../../shared/models/Map';
import { TabComponent } from '../../shared/components/tabs/tab/tab.component';
import { Feature, GeometryObject } from 'geojson';
import { TableClickEvent } from '../../shared/components/table/table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-map-vehicle',
  templateUrl: './map-vehicle.component.html',
  styleUrls: ['./map-vehicle.component.scss',]
})
export class MapVehicleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
