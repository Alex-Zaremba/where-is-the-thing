import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractFormControlComponent } from '../abstract-form-control.component';
import { NameWithDigitsFormControl } from './name-with-digits-form-control';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-name-with-digits-form-control',
    templateUrl: './name-with-digits-form-control.component.html',
})
export class NameWithDigitsFormControlComponent extends AbstractFormControlComponent<NameWithDigitsFormControl> {
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Input() override parentForm: FormGroup;
    @Input() override title: string;
    @Input() override controlName: string;
    @Input() placeholder: string;
    @Input() floatLabel: string;
    @Input() inline: boolean;

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

    public get floatLabelText(): string {
        return this.floatLabel || 'never';
    }

    public get isInline(): boolean {
        return this.inline || false;
    }

    public get readOnlyCss(): boolean {
        return this.control.readOnlyCss || false;
    }
}
