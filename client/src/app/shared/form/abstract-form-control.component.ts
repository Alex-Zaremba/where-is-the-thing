import { Injectable, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { collections } from '../constants/collections';
import { AbstractFormControl } from './abstract-form-control';

@Injectable()

export abstract class AbstractFormControlComponent<T extends AbstractFormControl> {
    @Input() parentForm: FormGroup;
    @Input() title: string;
    @Input() controlName: string;

    public requiredText: string = collections.messages.required;
    public minLengthErr: string = collections.messages.minlength;
    public maxLengthErr: string = collections.messages.maxlength;
    public minValueErrorMessage: string = collections.messages.minValueErrorMessage;
    public maxValueErrorMessage: string = collections.messages.maxValueErrorMessage;
    public emailValidatorErr: string = collections.messages.emailValidatorErrMessage;

    get isRequired(): boolean {
        return this.control?.isRequired ?? false;
    }

    get isDisabled(): boolean {
        return this.control?.isDisabled ?? false;
    }

    get control(): T {
        return this.parentForm.get(this.controlName) as T;
    }
}
