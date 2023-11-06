import { Validators, ValidatorFn } from '@angular/forms';
import { AbstractFormControl } from '../abstract-form-control';

export class NumberFormControl extends AbstractFormControl {
    validators: any;
    constructor(required: boolean = false, disabled: boolean = false, private min: number = 0, private max: number, private onlyInt: boolean = false, private options?: NumberOptions) {
        super(required, disabled);
        this.setValue(null);

        this.updateValidators(required, this.min, this.max);
    }

    set maxValue(max: number) {
        this.max = max;

        this.updateValidators(this.isRequired, this.min, this.max);
    }

    get minLength(): number {
        return this.min;
    }

    get maxLength(): number {
        return this.max;
    }

    get onlyIntegers(): boolean {
        return this.onlyInt === true;
    }

    get readOnlyCss(): boolean {
        return this.options?.readOnlyCss;
    }

    get separator(): string {
        return this.onlyIntegers === true ? 'separator.0' : 'separator.2';
    }

    protected getValidators(): ValidatorFn[] {
        return this.validators;
    }

    override setValue(
        value: any,
        options?: {
            onlySelf?: boolean;
            emitEvent?: boolean;
            emitModelToViewChange?: boolean;
            emitViewToModelChange?: boolean;
        }
    ) {
        if (typeof value === 'string') {
            if (value) {
                value = Number.parseFloat(value);
            } else {
                value = null;
            }
        }
        super.setValue(value, options);
    }

    private updateValidators(required: boolean, min?: number, max?: number): void {
        const validators = [];

        if (required) {
            validators.push(Validators.required);
        }

        if (min) {
            validators.push(Validators.min(min));
        }

        if (max) {
            validators.push(Validators.max(max));
        }

        this.validators = validators;
        super.setValidators(validators);
    }
}

export interface NumberOptions {
    readOnlyCss?: boolean;
}
