import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, signal} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
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

    writeValue(city: string | null): void {
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

    onSuggestionPick(city: string) {
      this.isDropdownOpened.set(false)
      this.innerSearchControl.patchValue(city, {emitEvent: false})
      this.onChange(city)
      this.cdr.detectChanges()
    }

}
