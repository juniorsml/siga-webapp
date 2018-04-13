import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-device',
  templateUrl: './device.component.html',
  styleUrls: ['device.component.scss']
})
export class DeviceComponent implements OnInit {

  public devices: Array<any>;

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.data.subscribe(data => (this.devices = data.devices || new Array<any>()));
  }
}
