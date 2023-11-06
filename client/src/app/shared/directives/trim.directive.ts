import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrim]'
})
export class TrimDirective {

  constructor(private ngControl: NgControl) { }

  @HostListener('blur') onBlur(): void {
    const value = this.ngControl.control.value;
    if (value) {
      this.ngControl.control.patchValue(value + ''.trim().replace(/\s\s+/g, ' '));
    }
  }

}
