import { Component, EventEmitter, Output, Input, OnInit,ElementRef } from '@angular/core';

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
  @Output() public onPlaceSelected = new EventEmitter<any>();
  
  private location: any;

  public docType = 0;
  public colorIcon = '';
  public placeSelected = false;

  
 

  public data: string;

  public status: boolean = false;



  public icon: string = '';

 public changeIcon(event){
       // console.log(event.ToElement.dataset.icon);
       // debugger
       let target = event.currentTarget;
       this.icon = target.dataset.icon;
       console.log(target.dataset.icon);
       this.status = !this.status;
  }
  

  constructor(private _eref: ElementRef) { }


  toggleChooseIcon() {

    this.status = !this.status;
  }

  // Close When Click outSide of Component
   outClick(event) {
       if (!this._eref.nativeElement.contains(event.target)){// or some similar check
        if (this.status != false) {
          this.status = false;
        }
      }
    }


  ngOnInit(): void {
    // debugger
    this.placeSelected = this.formType === 'area' || this.formType === 'group' || this.formType === 'place';
  }

  public backButton() {
    this.onBackButton.emit(this.backParam);
  }

  public onPlacesFiltered(event) {
    
    const { location } = event.geometry;
    if (location === undefined) return;
    this.location = location;
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
