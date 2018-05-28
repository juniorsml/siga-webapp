import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { GroupedItems } from './Grouped';

@Component({
  selector: 'sga-select-grouped',
  templateUrl: './select-grouped.component.html',
  styleUrls: ['./select-grouped.component.scss']
})
export class SelectGroupedComponent {

  @Input() public placeholder: string;
  @Input() public noSuggestionsText: string;
  @Input() public groupedItems = new Array<GroupedItems>();
  
  @Output() public onSelected = new EventEmitter<any>();
  @Output() public onFiltered = new EventEmitter<string>();
  
  @ViewChild('input') private inputElement: ElementRef;
  
  public hasFocus = false;
  
  constructor(private elementRef: ElementRef) {}
  
  @HostListener('document:click', ['$event.target'])
  public onClick = targetElement => this.hasFocus = this.elementRef.nativeElement.contains(targetElement);
  
  public onFocus = () => this.hasFocus = true;

  public onKeyUp = event => this.onFiltered.emit(event);

  public onSelect = value => {
    this.onSelected.emit(value);
    this.inputElement.nativeElement.value = value; 
    this.hasFocus = false;
  }
}
