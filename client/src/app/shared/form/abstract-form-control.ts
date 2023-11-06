import { FormControl, Validators, ValidatorFn, AbstractControlOptions } from '@angular/forms';

export abstract class AbstractFormControl extends FormControl {
    constructor(private required: boolean = false, disabled: boolean = false, controlOptions?: AbstractControlOptions | null) {
        super({ value: '', disabled }, controlOptions);

        const validators = this.getValidators();
        if (required) {
            validators?.push(Validators.required);
        }
        this.setValidators(validators);
    }

    public markAsRequredAndEnable(): void {
        this.markAsRequred();
        this.enable();
    }

    public markRequiredOrNot(isRequired: boolean) {
        if (isRequired) {
            this.markAsRequred();
        } else {
            this.markAsNotRequred();
        }
    }

    public markAsValid(): void {
        this.setErrors(null);
    }

    public markAsInvalid(): void {
        this.setErrors([{ 'incorrect': true }]);
    }

    public markAsNotRequredAndDisable(): void {
        this.markAsNotRequred();
        this.disable();
    }

    public markAsRequred(): void {
        let isAlreadyRequired = false;
        this.required = true;

        const validators = this.getValidators();

        validators?.forEach((validatorFn: ValidatorFn) => {
            if (validatorFn.name === 'required') {
                isAlreadyRequired = true;
            }
        });

        if (!isAlreadyRequired) {
            validators.push(Validators.required);
        }

        this.setValidators(validators);

        this.updateValueAndValidity();
    }

    public markAsNotRequred(): void {
        this.required = false;
        let validators = this.getValidators();

        validators = validators.filter((validatorFn: ValidatorFn) => {
            return validatorFn.name !== 'required';
        });

        this.setValidators(validators);

        this.updateValueAndValidity();
    }

    protected abstract getValidators(): ValidatorFn[];

    public get isRequired(): boolean {
        return this.required;
    }

    public get isDisabled(): boolean {
        return this.disabled;
    }
}
