import { Component, EventEmitter, Output, Input , OnInit } from '@angular/core';
import { MotoristService } from '../motorist.service';
import { Observable } from '../../../../node_modules/rxjs';


@Component({
  selector: 'sga-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog-component.scss']
})
export class ProfileDialogComponent implements OnInit {
  @Input() showDialog: boolean;
  @Input() selectedMotorist: any;
  @Output() onDialogClose: EventEmitter<void> = new EventEmitter<void>();

  constructor( private motoristService: MotoristService)  {}

  ngOnInit(): void {
  
  }

  onClose() {
    this.showDialog = false;
    this.onDialogClose.emit();
  }

  public getMotorist(motoristId: string): Observable<any> {
      return this.motoristService.getMotorist(motoristId);
  }


}
