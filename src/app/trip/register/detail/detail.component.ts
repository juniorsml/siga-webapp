import {Component, ViewChild, OnInit} from '@angular/core';
import { FormService } from '../dataform.service';
import { OperationService } from '../../../risk-management/configuration/operation/operation.service';

@Component({
  selector: 'sga-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['detail.component.scss']
})

export class DetailComponent implements OnInit {
 

 @ViewChild('formDetail') formDetail: any;
 
 listOfConfigs:any;

 constructor(private formData: FormService, private operationService: OperationService) { }

  ngOnDestroy(){
    this.formData.updateObj(this.formDetail.value);
    console.log(this.formDetail.value);
  }

  ngOnInit(){
    this
      .operationService
      .getConfigs()
      .subscribe(list => this.listOfConfigs = list);
  }
  

}
