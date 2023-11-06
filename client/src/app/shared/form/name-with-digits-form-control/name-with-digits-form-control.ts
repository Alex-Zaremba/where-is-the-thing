import { Validators, ValidatorFn } from '@angular/forms';
import { AbstractFormControl } from '../abstract-form-control';

export class NameWithDigitsFormControl extends AbstractFormControl {
    validators: any;
    constructor(required: boolean = false, disabled: boolean = false, private options?: NameOptions,) {
        super(required, disabled);

        if (options && options.defaultValue) {
            this.setValue(options.defaultValue);
        } else {
            this.setValue(null);
        }

        this.updateValidators(required, this.options?.minLength, this.options?.maxLength);
    }

    public maxLength: number = 50;

    public get readOnlyCss(): boolean {
        return this.options?.readOnlyCss;
    }

    public get minLength(): number {
        return this.options?.minLength;
    }

    private updateValidators(required: boolean, minLength?: number, maxLength?: number): void {
        const validators = [];

        if (required) {
            validators.push(Validators.required);
        }

        if (minLength) {
            validators.push(Validators.minLength(minLength));
        }

        if (maxLength) {
            this.maxLength = maxLength;
            validators.push(Validators.maxLength(maxLength));
        }

        this.validators = validators;
        super.setValidators(validators);
    }

    protected getValidators(): ValidatorFn[] {
        return this.validators;
    }
}

export interface NameOptions {
    minLength?: number;
    maxLength?: number;
    defaultValue?: any;
    readOnlyCss?: boolean;
}
