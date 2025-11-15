import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lib-tt-input',
  imports: [
    FormsModule
  ],
  templateUrl: './tt-input.html',
  styleUrl: './tt-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => TtInput)
  }]
})
export class TtInput implements ControlValueAccessor {
    type = signal<'text' | 'password'>('text')
    cdr = inject(ChangeDetectorRef)
    text: string | null = null

    onChange: any


    writeValue(obj: any): void {
      this.text = obj;
      this.cdr.detectChanges()
    }

    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {

    }

    onModelChange(val: string) {
      this.onChange(val)
    }
}
