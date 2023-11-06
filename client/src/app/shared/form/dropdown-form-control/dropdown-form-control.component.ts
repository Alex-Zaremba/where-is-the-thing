import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractFormControlComponent } from '../abstract-form-control.component';
import { DropDownFormControl } from './dropdown-form-control';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
    selector: 'app-dropdown-form-control',
    templateUrl: './dropdown-form-control.component.html',
})
export class DropDownFormControlComponent extends AbstractFormControlComponent<DropDownFormControl> {
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Input() override parentForm: FormGroup;
    @Input() override title: string;
    @Input() override controlName: string;
    @Input() placeholder: string;
    @Input() floatLabel: FloatLabelType;
    @Input() inline: boolean;

    change(value: any): void {
        this.onChange.emit(value);
    }

    selectOpened(value: any): void {
        if (value !== 0) {
            this.collection.forEach((element) => {
                if (element[this.keyPropertyName] === value) {
                    document.querySelectorAll('.dropdown-item-class').forEach((item) => {
                        if (item.getAttribute('id') === value.toString()) {
                            item.scrollIntoView({ block: 'center', behavior: 'smooth' });
                        }
                    });
                }
            });
        }
    }

    public get isInline(): boolean {
        return this.inline || false;
    }

    public get floatLabelText(): string {
        return (this.floatLabel || 'alwaus') as FloatLabelType;
    }

    public get placeholderText(): string {
        return this.placeholder || '';
    }

    public get readOnlyCss(): boolean {
        return this.control.readOnlyCss || false;
    }

    public get collection(): any[] {
        return this.control.collection || [];
    }

    public get hiddenOptions(): any[] {
        return this.control.hiddenOptions || [];
    }

    public get keyPropertyName(): string {
        return this.control.keyPropertyName || 'name';
    }

    public get valuePropertyName(): string {
        return this.control.valuePropertyName || 'name';
    }

    public get matOptionAutoHeight(): boolean {
        return this.control.matOptionAutoHeight || false;
    }
}
