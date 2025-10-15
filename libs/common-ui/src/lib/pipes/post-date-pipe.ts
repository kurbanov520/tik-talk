import { inject, Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'postDate',
})
export class PostDatePipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) return '';
    const now = DateTime.fromISO(value);

    return now.toRelative();
  }
}
