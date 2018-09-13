import {Component, ViewChild} from '@angular/core';
import { FormService } from '../dataform.service';


@Component({
  selector: 'sga-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['detail.component.scss']
})

export class DetailComponent {
 
 @ViewChild('formDetail') formDetail: any;
 

 constructor(private formData: FormService) { }

 

  ngOnDestroy(){
    this.formData.updateObj(this.formDetail.value);
    console.log(this.formDetail.value);
  }
  

}
