import {
  Component,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter,
  TemplateRef,
  ContentChild,
  HostListener
} from '@angular/core';

@Component({
  selector: 'sga-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent {
  @Input() suggestions: any[];
  @Input() styleClass: string = 'autocomplete';
  @Input() minLength: number;
  @Input() placeholder: string = '';
  @Input() url: string = '';
  @Input() noSuggestionsText: string = '';
  @ViewChild('input') inputElement: ElementRef;
  @Output() public itemSelected: EventEmitter<any> = new EventEmitter();
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  searching: boolean = false;
  searchRequested: boolean = false;
  hasFocus: boolean;
  suggestionSelected: boolean;
  suggestionIndex: number = 0;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && !this.suggestionSelected) {
      this.hasFocus = false;
    }
  }

  onKeyDown(event) {
    // up
    if (event.keyCode == 38 && this.suggestionIndex > 0) {
      event.preventDefault();
      return false;
    }

    // down
    if (
      event.keyCode == 40 &&
      this.suggestionIndex < this.suggestions.length - 1
    ) {
      event.preventDefault();
      return false;
    }
  }

  onKeyUp(event: any) {
    this.suggestionSelected = false;

    if (this.hasFocus && this.suggestions != null) {
      // up
      if (event.keyCode == 38 && this.suggestionIndex > 0) {
        --this.suggestionIndex;
        return;
      }

      // down
      if (
        event.keyCode == 40 &&
        this.suggestionIndex < this.suggestions.length - 1
      ) {
        ++this.suggestionIndex;
        return;
      }

      // enter
      if (event.keyCode == 13) {
        this.onSelect(this.suggestions[this.suggestionIndex]);
        return;
      }

      // backspace
      if (event.keyCode == 8) {
        this.suggestions = null;
      }
    }

    if (
      (this.inputElement.nativeElement.value.length > 0 &&
        this.minLength == null) ||
      this.inputElement.nativeElement.value.length >= this.minLength
    ) {
      if (!this.searching) {
        this.search();
      } else {
        this.searchRequested = true;
      }
    }
  }

  onFocus() {
    this.hasFocus = true;
  }

  onSelect(suggestion) {
    this.searchRequested = false;
    this.suggestionSelected = true;
    this.suggestions = null;
    this.suggestionIndex = 0;
    this.inputElement.nativeElement.value = null;
    this.inputElement.nativeElement.focus();
    this.itemSelected.emit(suggestion);
  }

  search() {
    console.log('search');
    // this.dataService.get(this.url + this.inputElement.nativeElement.value)
    //     .toPromise()
    //     .then(data => {
    //         console.log(data);
    //         this.suggestions = data.json();
    //         if (this.searchRequested) {
    //             this.search();
    //         }
    //     }).catch((ex) => {
    //     console.log(ex);
    // });
  }

  noSuggestionClick() {
    this.suggestions = null;
  }
}
