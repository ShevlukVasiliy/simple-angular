import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plus_five',
})
export class PlusFivePipe implements PipeTransform {
  transform(value: number): unknown {
    return String(value + 5);
  }
}
