import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
/*
 * Filters out data based on string input
 */
@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {
  transform(object: any, args: any) {
    if (object != null && args != null && args[0] != null) {
      return object.filter(item => {
        const searchValues: Array<any> = this.getRootObjectValues(item, args[1]);
        return this.find(searchValues, args[0]);
      });
    }
    return object;
  }

  getRootObjectValues(item: Object, keys: Array<string>) {
    let object: any = item;
    const values = [];

    for (let i = 0; i < keys.length; i++) {
      const nodes = keys[i].split('.');
      object = item;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] != null && object != null) {
          object = object[nodes[i]];
        }
      }
      values.push(object);
    }
    return values;
  }

  find(searchValues: Array<any>, query: string) {
    for (let i = 0; i < searchValues.length; i++) {
      const value = searchValues[i];
      if (value == null) {
      } else if (value.toString().length === 13) {
        const time = Number(value);
        if (!isNaN(time)) {
          const date = new Date(time);
          const result = new DatePipe('en').transform(date, 'medium');
          if (result
          .toString()
          .toUpperCase()
          .includes(query.toUpperCase())) {
            return true;
          }
        }
      } else if (
        value
          .toString()
          .toUpperCase()
          .includes(query.toUpperCase())) {
        return true;
      }
    }

    // for (let i = 0; i < searchValues.length; i++) {
    //   if (
    //     searchValues[i] != null &&
    //     searchValues[i]
    //       .toString()
    //       .toUpperCase()
    //       .includes(query.toUpperCase())
    //   ) {
    //     return true;
    //   }
    // }
  }
}
