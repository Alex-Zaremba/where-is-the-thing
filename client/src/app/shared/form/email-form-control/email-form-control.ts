import { Validators, ValidatorFn } from '@angular/forms';
import { emailValidator } from '../../validators/emailValidator';
import { AbstractFormControl } from '../abstract-form-control';

export class EmailFormControl extends AbstractFormControl {
    constructor(
        required?: boolean,
        disabled: boolean = false,
        private options?: EmailOptions
    ) {
        super(required, disabled);
    }

    public readonly minLength: number = 5;
    public readonly maxLength: number = 100;

    protected getValidators(): ValidatorFn[] {
        return [Validators.minLength(5), Validators.maxLength(100), emailValidator()];
    }
}

export interface EmailOptions {
}
