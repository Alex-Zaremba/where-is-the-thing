
import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyLetters]'
})
export class OnlyLettersDirective {

  constructor(private ngControl: NgControl) { }

  @HostListener('blur') onBlur() {
    const value = this.ngControl.control.value;
    if (value) {
      this.ngControl.control.patchValue(value.trim().replace(/[^a-zA-Z- ]/g, ''));
    }
  }

}
