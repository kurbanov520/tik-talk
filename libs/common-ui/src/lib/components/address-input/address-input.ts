import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, signal} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {TtInput} from '../tt-input/tt-input';
import {DadataService} from '../../data';
import {debounceTime, switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {DadataSuggestion} from '../../data/interfaces/dadata.interface';

@Component({
  selector: 'lib-address-input',
  imports: [
    ReactiveFormsModule,
    TtInput,
    AsyncPipe
  ],
  templateUrl: './address-input.html',
  styleUrl: './address-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => AddressInput),
  }]
})
export class AddressInput implements ControlValueAccessor {
    innerSearchControl = new FormControl();
    #dadataService = inject(DadataService)
    cdr = inject(ChangeDetectorRef)

    suggestForm = new FormGroup({
      city: new FormControl(''),
      street: new FormControl(''),
      building: new FormControl(''),
    })

    constructor() {
      this.suggestForm.valueChanges.subscribe(val => {
        this.onChange(val)
      })
    }

    isDropdownOpened = signal<boolean>(false)

    suggestions$ = this.innerSearchControl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(val => {
          return this.#dadataService.getSuggestion(val)
            .pipe(
              tap(val => {
                this.isDropdownOpened.set(!!val.length)
              })
            )
        })
      )

    writeValue(city: string | null | any): void {

      if(!city) {
        this.suggestForm.reset()
        this.innerSearchControl.setValue('')
        return
      }

      const address = city.split(' ')
      this.suggestForm.patchValue({
        city: address[0] || '',
        street: address[1] || '',
        building: address[2] || ''
      })

      this.innerSearchControl.patchValue(city, {emitEvent: false})
    }

    registerOnChange(fn: any): void {
      this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {

    }

    onChange(value: any) {
    }

    onTouched() {

    }

    onSuggestionPick(suggest: DadataSuggestion) {
      this.isDropdownOpened.set(false)
      this.suggestForm.patchValue({
        city: suggest.data.city,
        street: suggest.data.street,
        building: suggest.data.house
      })

      this.onChange(this.innerSearchControl.value)
      this.cdr.detectChanges()

    }
}
