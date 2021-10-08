import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimdate'
})
export class TrimdatePipe implements PipeTransform {

  transform(date: any): any {
    if (date.length > 5) {
      return date.slice(0, 5)
    }
  }

}
