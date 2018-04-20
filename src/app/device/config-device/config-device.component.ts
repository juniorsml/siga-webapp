import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-config-device',
  templateUrl: './config-device.component.html',
  styleUrls: ['./config-device.component.scss']
})
export class ConfigDeviceComponent implements OnInit {
  public devices: Array<any>;

  public showFormRegister = false;

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.data.subscribe(data => (this.devices = data.devices));
  }

  openFormRegister() {
    this.showFormRegister = !this.showFormRegister;
  }

  closeFormRegister() {
    this.showFormRegister = false;
  }
}