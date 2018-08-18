import { Injectable } from '@angular/core';


import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../shared/services/http.service';
import { Device } from '../shared/models/api/Motorist';


@Injectable()
export class DeviceService {

  constructor(private http: HttpService) { }

  public getDevices(): Observable<Array<Device>> {
    return this
      .http
      .get('api/devices')
      .pipe(map(res => <Array<Device>>res.json()));
  }

 }
