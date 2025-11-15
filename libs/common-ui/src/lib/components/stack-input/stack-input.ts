import {ChangeDetectionStrategy, Component, forwardRef, HostListener} from '@angular/core';
import {SvgIcon} from '@tt/common-ui';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'lib-stack-input',
  imports: [
    SvgIcon,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './stack-input.html',
  styleUrl: './stack-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInput),
    }
  ]
})
export class StackInput implements ControlValueAccessor {

    value$ = new BehaviorSubject<string[]>([]);

    innerInput = ''

    @HostListener('keydown.enter', ['$event'])
    onEnter(event: Event) {
      event.stopPropagation();
      event.preventDefault();

      if(!this.innerInput) return

      this.value$.next([...this.value$.value, this.innerInput])

      this.innerInput = ''
      this.onChange(this.value$.value)
    }

    writeValue(stack: string[] | null) {
      if (!stack) {
        this.value$.next([])
        return
      }

      this.value$.next(stack)
    }

    registerOnChange(fn: any): void {
      this.onChange = fn
    }

    registerOnTouched(fn: any): void {
      this.onTouched = fn
    }

    setDisabledState?(isDisabled: boolean) {

    }

    onChange(value: string[] | null) {

    }

    onTouched() {

    }

    onTagDelete(i: number) {
      const tags = this.value$.value
      tags.splice(i, 1)

      this.value$.next(tags)
      this.onChange(this.value$.value)
    }


}
