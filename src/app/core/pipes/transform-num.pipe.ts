import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'roundMoney' })
export class MoneyPipe implements PipeTransform {
  transform(amount: number): string {
    let rounded = '';
    if (amount > 999999999) {
      rounded = (amount / 1000000000).toFixed(1) + ' bln USD';
    } else {
      rounded = (amount / 1000000).toFixed(1) + ' mln USD';
    }
    return rounded;
  }
}
