import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IFeature, MockService } from '../../../../../libs/data-access/src/lib/chats/services/mock.service';
import { KeyValuePipe } from '@angular/common';
import { MaskitoOptions } from '@maskito/core';
import { MaskitoDirective } from '@maskito/angular';
import { NameValidator } from './name.validator';

enum tvBrand {
  LG = 'LG',
  SAMSUNG = 'SAMSUNG',
  SONY = 'SONY',
  PHILLIPS = 'PHILLIPS',
}

enum service {
  REPAIR = 'REPAIR',
  SETTINGS = 'SETTINGS',
  REPLACEMENT = 'REPLACEMENT',
  CHANNEL = 'CHANNEL',
}

interface Address {
  city?: string;
  street?: string;
  building?: number;
  apartment?: number;
}

function validateDateRange({
  fromControlName,
  toControlName,
}: {
  fromControlName: string;
  toControlName: string;
}) {
  return (control: AbstractControl) => {
    const fromControl = control.get(fromControlName);
    const toControl = control.get(toControlName);

    if (!fromControl || !toControl) return null;

    const fromDate = new Date(fromControl.value);
    const toDate = new Date(toControl.value);

    return fromDate && toDate && fromDate > toDate
      ? { dateRange: { message: 'Дата начала не может быть позднее даты конца' } }
      : null;
  };
}

function Addresses(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl(initialValue.city ?? '', Validators.required),
    street: new FormControl(initialValue.street ?? '', Validators.required),
    building: new FormControl(initialValue.building ?? null, Validators.required),
    apartment: new FormControl(initialValue.apartment ?? null, Validators.required),
  });
}

function myValidator(value: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.startsWith(value)
      ? { startsWith: { message: `'${value}' не та буква которая нам нужна` } }
      : null;
  };
}

@Component({
  selector: 'app-experimental',
  imports: [ReactiveFormsModule, KeyValuePipe, MaskitoDirective],
  templateUrl: './experimental.html',
  styleUrl: './experimental.scss',
})
export class Experimental {
  phoneMask: MaskitoOptions = {
    mask: [
      '+',
      '7',
      ' ',
      '(',
      /\d/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
  };

  mockService = inject(MockService);
  nameValidator = inject(NameValidator);
  features: IFeature[] = [];

  guarantees = [
    { value: 12, label: '12 месяцев' },
    { value: 6, label: '6 месяцев' },
    { value: 1, label: '1 месяц' },
  ];

  tvBrand = tvBrand;
  service = service;

  form = new FormGroup({
    brand: new FormControl(''),
    service: new FormControl(''),
    nameClient: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)],
      updateOn: 'blur',
    }),
    guarantee: new FormControl('', [Validators.required]),
    phoneClient: new FormControl('', [Validators.required]),
    problem: new FormControl(null),
    addressClient: new FormArray([Addresses()]),
    features: new FormRecord({}),
    dateRange: new FormGroup(
      {
        from: new FormControl<string>(''),
        to: new FormControl<string>(''),
      },
      validateDateRange({ fromControlName: 'from', toControlName: 'to' })
    ),
  });

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    console.log(this.form.valid);
    console.log(this.form.value);
  }

  constructor() {
    this.mockService
      .getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        this.form.controls.addressClient.clear();

        for (const arra of val) {
          this.form.controls.addressClient.push(Addresses(arra));
        }
      });

    this.mockService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;

        for (const feature of features) {
          this.form.controls.features.addControl(feature.code, new FormControl(feature.value));
        }
      });
  }

  addAddress() {
    this.form.controls.addressClient.insert(0, Addresses());
  }

  deleteAddress(index: number) {
    this.form.controls.addressClient.removeAt(index);
  }

  sort = () => 0;

  protected readonly Addresses = Addresses;
}
