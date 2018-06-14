import { Component, EventEmitter, Output, Input, OnInit, ElementRef } from '@angular/core';

import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';
import { MapStyle } from '../../../shared/models/MapStyle';

@Component({
  selector: 'sga-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    '(document:click)': 'outClick($event)'
  }
})
export class RegisterComponent implements OnInit {

  @Input() public formType: string;
  @Input() public backParam: string;
  @Input() private changeMapStyle: Function;

  @Output() public onSubmitForm = new EventEmitter<any>();
  @Output() public onBackButton = new EventEmitter<string>();
  @Output() public onPlaceSelected = new EventEmitter<any>();
  @Output() public onPreviewClicked = new EventEmitter<any>();

  private location: any;

  public docType = 0;
  public colorIcon = '';
  public placeSelected = false;
  public data: string;
  public status = false;
  public icon = '';

  public nameMaxLenght = 110;
  public descriptionMaxLenght = 100;
  public id_customerMaxLenght = 30;
  public key_customerMaxLenght = 30;

  public opts: ISlimScrollOptions;
  public scrollEvents: EventEmitter<SlimScrollEvent>;

  public name: string;

  public inputValue: string;

  public typeSelected = 'location';

  constructor(private _eref: ElementRef) { }

  ngOnInit(): void {
    this.placeSelected = this.formType === 'area' || this.formType === 'group' || this.formType === 'place';
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

  public changeIcon(event) {
    const target = event.currentTarget;
    this.icon = target.dataset.icon;
    this.status = !this.status;
  }

  public onColorChange(item) {
    console.log(item);
  }

  public toggleChooseIcon() {
    this.status = !this.status;
  }

  // Close When Click outSide of Component
  outClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {// or some similar check
      if (this.status !== false) {
        this.status = false;
      }
    }
  }

  public redrawPoint(iconColor, backgroundColor, fillColor, strokeColor) {
    if (this.typeSelected === 'area') {
      this.onPreviewClicked.emit({ fillColor: fillColor.value, strokeColor: strokeColor.value });
    } else {
      const icon = this.icon === '' ? 'fa-map-marker-alt' : this.icon;
      this.onPreviewClicked.emit({ iconColor: iconColor.value, backgroundColor: backgroundColor.value, icon });
    }
  }

  public backButton() {
    this.onBackButton.emit(this.backParam);
  }

  public setTypeSelected = param => {
    this.typeSelected = param;
    param === 'area' ?
      this.changeMapStyle(true, MapStyle.Street) :
      this.changeMapStyle(false, MapStyle.Outdoor);
  }

  public onPlacesFiltered(event) {
    const { location } = event.geometry;
    if (location === undefined) { return; }
    const options = {
      icon: 'fa-map-marker-alt',
      iconColor: '#fff',
      backgroundColor: '#506693'
    };
    this.location = {
      ...location,
      options
    };
    this.onPlaceSelected.emit(this.location);
  }

  public onPlacesFilterRemoved() {
    this.location = null;
  }

  public isValidForm(form) {
    return form.valid && this.docType !== 0;
  }

  public onSubmit(form) {
    const { value } = form;
    try {
      value.latitude = this.location.lat();
      value.longitude = this.location.lng();
      this.onSubmitForm.emit(value);
    } catch {
      this.onSubmitForm.emit(value);
    }
  }
}
