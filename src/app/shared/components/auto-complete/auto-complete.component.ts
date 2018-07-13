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
import { HttpService } from '../../services/http.service';
import { Vehicle } from '../../models/api/Vehicle';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sga-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent {

  @Input() public data: Array<any>;
  @Input() public url = '';
  @Input() public minLength: number;
  @Input() public keepSelect: boolean;
  @Input() public placeholder = '';
  @Input() public propToFilter = '';
  @Input() public noSuggestionsText = '';
  @Input() public suggestions = new Array<any>();
  @Input() public styleClass = 'autocomplete';

  @Output() public itemSelected = new EventEmitter();
  @Output() public onCreateNew = new EventEmitter<any>();

  @ViewChild('input') inputElement: ElementRef;

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  public hasFocus = false;
  public searching = false;
  public suggestionIndex = 0;
  public searchRequested = false;
  public suggestionSelected = false;

  constructor(private elementRef: ElementRef,
    private http: HttpService) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && !this.suggestionSelected) {
      this.hasFocus = false;
    }
  }

  public create(): void {
    this.onCreateNew.emit(this.inputElement.nativeElement.value);
  }

  onKeyDown(event): boolean {
    // up
    if (event.keyCode === 38 && this.suggestionIndex > 0) {
      event.preventDefault();
      return false;
    }

    // down
    if (
      event.keyCode === 40 &&
      this.suggestionIndex < this.suggestions.length - 1
    ) {
      event.preventDefault();
      return false;
    }
  }

  public onKeyUp(event: any): void {
    this.suggestionSelected = false;

    if (this.hasFocus && this.suggestions != null) {
      // up
      if (event.keyCode === 38 && this.suggestionIndex > 0) {
        --this.suggestionIndex;
        return;
      }

      // down
      if (
        event.keyCode === 40 &&
        this.suggestionIndex < this.suggestions.length - 1
      ) {
        ++this.suggestionIndex;
        return;
      }

      // enter
      if (event.keyCode === 13) {
        this.onSelect(this.suggestions[this.suggestionIndex]);
        return;
      }

      // backspace
      if (event.keyCode === 8) {
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

  public onFocus(): void {
    this.hasFocus = true;
  }

  private onSelect(suggestion): void {
    this.searchRequested = false;
    this.suggestionSelected = true;
    this.suggestions = null;
    this.suggestionIndex = 0;
    this.inputElement.nativeElement.value = this.keepSelect ? suggestion[this.propToFilter] : null;
    this.inputElement.nativeElement.focus();
    this.itemSelected.emit(suggestion);
  }

  private search(): void {
    if (this.url !== '') {
      this.searching = true;
      this.suggestions = [];
      this
        .http
        .get(`${this.url}${this.inputElement.nativeElement.value}`)
        .pipe(map(data => <Array<Vehicle>>data.json()))
        .subscribe(
          data => this.suggestions = data,
          error => console.warn(error),
          () => this.searching = false);
    } else {
      this.suggestions = this.data.filter(
        m => m[this.propToFilter].toLowerCase().indexOf(this.inputElement.nativeElement.value.toLowerCase()) > -1
      );
    }
  }

  public noSuggestionClick(): void {
    this.suggestions = null;
  }
}

