import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Self, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [

  ]
})
export class TextInputComponent implements ControlValueAccessor  {
  value!: string;
  disabled = false;
  @Input() inputValue: any;
  @Input() label: any;
  @Input() forLabel: any;
  @Input() placeholder: any;
  @Input() type: string = 'text';
  @Input() requiredMessage:string='';
  @Input() minlength:string='';
  @Input() maxlength:string='';

  onChange: any = (value: any) => {};
  onTouched: any = () => {};
  propagateChange = (fn: any) => {};

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    // Perform validation logic here
    if (!control.value || control.value === '') {
      return { required: true };
    }
    return null;
  }

  changeValue(value: any){
    this.inputValue = value;
    this.propagateChange(this.inputValue);
  }
  @Input() title:string='';


}
