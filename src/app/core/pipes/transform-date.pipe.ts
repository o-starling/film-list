import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ukDate' })
export class UkrDatePipe implements PipeTransform {
  transform(value: number): string {
    return new Date(value).toLocaleDateString('uk-UA');
  }
}
