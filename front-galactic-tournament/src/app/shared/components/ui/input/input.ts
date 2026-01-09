import { ChangeDetectionStrategy, Component, inject, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorService } from '../../../../core/services/form-error/form-error.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: 'text' | 'number' = 'text';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() inputMode: string = 'text';
  @Input() pattern: string = '';

  value: any = '';
  disabled: boolean = false;
  
  private formErrorService = inject(FormErrorService);

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get control() {
    return this.ngControl?.control;
  }

  get errorMessage(): string | null {
    if (this.control?.errors && (this.control?.touched || this.control?.dirty)) {
      return this.formErrorService.getErrorMessage(this.control.errors);
    }
    return null;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }
}
