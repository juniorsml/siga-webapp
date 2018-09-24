import {Component, ViewChild, OnInit} from '@angular/core';
;
import { OperationService } from '../../../risk-management/configuration/operation/operation.service';
import { TripObject } from '../../../shared/services/trip-object.service';

@Component({
  selector: 'sga-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['detail.component.scss'],
  providers:[OperationService]
})

export class DetailComponent implements OnInit {
 
  generalInfos;
 @ViewChild('formDetail') formDetail: any;
 public obj:any;
 listOfConfigs:any;

 constructor(private formData: TripObject, private operationService: OperationService) { }

  ngOnDestroy(){

    this.generalInfos = this.formDetail.value;

    this.formData.updateObj(this.generalInfos,'generalInfos')
    

    

  }

  ngOnInit(){
    this
      .operationService
      .getConfigs()
      .subscribe(list => this.listOfConfigs = list);

    

    this
      .formData
      .currentObj
      .subscribe(obj => this.obj = obj)

    

  }
  

}
