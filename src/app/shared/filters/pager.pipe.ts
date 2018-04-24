import {Pipe, PipeTransform} from '@angular/core';
/*
 * Filters out data based on string input
 */
@Pipe({
  name: 'pager',
  pure: false
})
export class PagerPipe implements PipeTransform {

    transform(object:any, args:any){
        var index = args.page -1;
        var quantity = args.quantity;
        var page = [];
        var pointer = (quantity * index);

        if (object != null && object.length > 0) {
            for (var i = 0; i < quantity; i++) {
                if(object[i + pointer] != null){
                    page[i] = object[i + pointer];
                }
            }
            return page;
        }
        return object;
    }
}
