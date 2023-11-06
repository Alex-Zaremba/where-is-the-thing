import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { constants } from '../constants/constants';

@Pipe({
  name: 'datetime'
})
export class DateTimePipe implements PipeTransform {
  constructor() {
  }

  transform(date: Date): string {
    if (!date) {
      return '';
    }

    return moment(date).format(constants.dateFormatWithTime);
  }
}
