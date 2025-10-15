import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IFeature {
  code: string;
  label: string;
  value: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MockService {
  getDates() {
    return of([
      {
        one: '12 месяцев',
        two: '6 месяцев',
        three: '1 месяц',
      },
    ]);
  }

  getAddresses() {
    return of([
      {
        city: 'Москва',
        street: 'Тверская',
        building: 14,
        apartment: 32,
      },
      {
        city: 'Санкт-петербург',
        street: 'Ленина',
        building: 100,
        apartment: 30,
      },
    ]);
  }

  getFeatures(): Observable<IFeature[]> {
    return of([
      {
        code: 'lift',
        label: 'Ремонт без очереди',
        value: true,
      },
      {
        code: 'strong-package',
        label: 'Доставка на дом',
        value: true,
      },
      {
        code: 'fast',
        label: 'Что то еще...',
        value: false,
      },
    ]);
  }
}
