import { Component, EventEmitter, Output, Input, OnInit, ElementRef } from '@angular/core';

import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';

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

  @Output() public onSubmitForm = new EventEmitter<any>();
  @Output() public onBackButton = new EventEmitter<string>();
  @Output() public onRadiusChanged = new EventEmitter<any>();
  @Output() public onPlaceSelected = new EventEmitter<any>();
  @Output() public onPreviewClicked = new EventEmitter<any>();

  public onSelectedTag = event => console.log(event);

  public location: any;

  public docType = 0;
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

  public colorIcon = '#ffffff';
  public fillColor = '#ff5e5e';
  public strokeColor = '#ff5e5e';
  public backgroundColor = '#ff5e5e';

  constructor(private _eref: ElementRef) { }

  ngOnInit(): void {
    this.placeSelected = this.formType === 'area' || this.formType === 'group' || this.formType === 'place';
    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      alwaysVisible: true,
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
    this.redrawPoint(this.colorIcon, this.backgroundColor, this.fillColor, this.strokeColor);
  }

  public onColorChange(item) {
    console.log(item);
  }

  public toggleChooseIcon() {
    this.status = !this.status;
  }

  public radiusChanged = value =>
    this.onRadiusChanged.emit(value)

  public iconSelected = color =>
    this.redrawPoint(color, this.backgroundColor, this.fillColor, this.strokeColor, () => this.colorIcon = color)

  public backgroundSelected = color =>
    this.redrawPoint(this.colorIcon, color, this.fillColor, this.strokeColor, () => this.backgroundColor = color)

  public fillSelected = color =>
    this.redrawPoint(this.colorIcon, this.backgroundColor, color, this.strokeColor, () => this.fillColor = color)

  public strokeSelected = color =>
    this.redrawPoint(this.colorIcon, this.backgroundColor, this.fillColor, color, () => this.strokeColor = color)

  // Close When Click outSide of Component
  outClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {// or some similar check
      if (this.status !== false) {
        this.status = false;
      }
    }
  }

  private redrawPoint(iconColor, backgroundColor, fillColor, strokeColor, after?) {
    const icon = this.icon === '' ? 'fa-map-marker-alt' : this.icon;
    this.onPreviewClicked.emit({ fillColor, strokeColor, iconColor, backgroundColor, icon });
    if (after) { after(); }
  }

  public backButton() {
    this.onBackButton.emit(this.backParam);
  }

  public setTypeSelected = param => {
    this.typeSelected = param;
  }

  public onPlacesFiltered(event) {
    if (event === undefined) { return; }
    const { location } = event.geometry;
    if (location === undefined) { return; }
    const options = {
      icon: this.icon ? this.icon : 'fa-map-marker-alt',
      iconColor: this.colorIcon ? this.colorIcon : '#fff',
      backgroundColor: this.backgroundColor ? this.backgroundColor : '#ff5e5e'
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
