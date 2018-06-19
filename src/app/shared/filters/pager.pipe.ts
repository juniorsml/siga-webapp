import {Pipe, PipeTransform} from '@angular/core';
/*
 * Filters out data based on string input
 */
@Pipe({
  name: 'pager',
  pure: false
})
export class PagerPipe implements PipeTransform {

    transform(object: any, args: any) {
        let index = args.page - 1;
        let quantity = args.quantity;
        let page = [];
        let pointer = (quantity * index);

        if (object != null && object.length > 0) {
            for (let i = 0; i < quantity; i++) {
                if (object[i + pointer] != null) {
                    page[i] = object[i + pointer];
                }
            }
            return page;
        }
        return object;
    }
}
