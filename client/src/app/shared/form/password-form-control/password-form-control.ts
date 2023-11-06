import { Validators, ValidatorFn } from '@angular/forms';
import { collections } from '../../constants/collections';
import { AbstractFormControl } from '../abstract-form-control';

export class PasswordFormControl extends AbstractFormControl {
    validators: any;
    constructor(required: boolean = false, disabled: boolean = false, private options?: PasswordOptions) {
        super(required, disabled);

        this.setValue(null);

        this.updateValidators(required, this.options?.minLength, this.options?.maxLength);
    }

    public minLength: number = 6;
    public maxLength: number = 50;

    get requiredErrorMessage(): string {
        if (this.options && this.options.requiredErrorMessage) {
            return this.options.requiredErrorMessage;
        } else {
            return collections.messages.required;
        }
    }

    private updateValidators(required: boolean, minLength?: number, maxLength?: number): void {
        const validators = [];

        if (required) {
            validators.push(Validators.required);
        }

        if (minLength) {
            this.minLength = minLength;
        }

        validators.push(Validators.minLength(this.minLength));

        if (maxLength) {
            this.maxLength = maxLength;
        }

        validators.push(Validators.maxLength(this.maxLength));

        this.validators = validators;
        super.setValidators(validators);
    }

    protected getValidators(): ValidatorFn[] {
        return this.validators;
    }
}

export interface PasswordOptions {
    minLength?: number;
    maxLength?: number;
    requiredErrorMessage?: string;
}
