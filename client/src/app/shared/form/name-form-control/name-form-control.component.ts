import { Component, Input } from '@angular/core';
import { AbstractFormControlComponent } from '../abstract-form-control.component';
import { NameFormControl } from './name-form-control';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-name-form-control',
    templateUrl: './name-form-control.component.html',
})
export class NameFormControlComponent extends AbstractFormControlComponent<NameFormControl> {
    @Input() override parentForm: FormGroup;
    @Input() override title: string;
    @Input() override controlName: string;

    faCheck: any = faCheck;

    public get maxLength(): number {
        return this.control.maxLength;
    }

    public get readOnlyCss(): boolean {
        return this.control.readOnlyCss || false;
    }
}
