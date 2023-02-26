import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'demoNumber',
})
export class DemoNumberPipe implements PipeTransform {

  transform(value): any {
    let res = [];
    for (let i = 0; i < value; i++) {
      res.push(i);
    }
    return res;
  }
}
