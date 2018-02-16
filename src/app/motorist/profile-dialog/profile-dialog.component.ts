import { 
  Component, 
  EventEmitter,
  Output, 
  Input 
} from '@angular/core';

@Component({
  selector: 'sga-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog-component.scss']
})
export class ProfileDialogComponent {
  @Input() showDialog: boolean;
  @Input() selectedMotorist;
  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();

  public onClose() {
    this.showDialog = false;
    this.onDialogClose.emit();
  }
}
