import {Component, ViewChild, OnInit} from '@angular/core';
import { FormService } from '../dataform.service';
import { OperationService } from '../../../risk-management/configuration/operation/operation.service';

@Component({
  selector: 'sga-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['detail.component.scss'],
  providers:[OperationService]
})

export class DetailComponent implements OnInit {
 
  generalInfos;
 @ViewChild('formDetail') formDetail: any;
 
 listOfConfigs:any;

 constructor(private formData: FormService, private operationService: OperationService) { }

  ngOnDestroy(){
 
    this.generalInfos = this.formDetail.value;
    this.formData.updateObj(this.generalInfos,'generalInfos')
  }

  ngOnInit(){
    this
      .operationService
      .getConfigs()
      .subscribe(list => this.listOfConfigs = list);
  }
  

}
