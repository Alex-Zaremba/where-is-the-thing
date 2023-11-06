import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractFormControlComponent } from '../abstract-form-control.component';
import { PasswordFormControl } from './password-form-control';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-password-form-control',
    templateUrl: './password-form-control.component.html',
})
export class PasswordFormControlComponent extends AbstractFormControlComponent<PasswordFormControl> {
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Input() override parentForm: FormGroup;
    @Input() override title: string;
    @Input() override controlName: string;
    @Input() placeholder: string;

    faCheck: any = faCheck;

    change(value: any): void {
        this.onChange.emit(value);
    }

    public get maxLength(): number {
        return this.control.maxLength;
    }

    public get placeholderText(): string {
        return this.placeholder || '';
    }
}
