import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { AbstractFormControlComponent } from '../abstract-form-control.component';
import { NumberFormControl } from './number-form-control';

@Component({
    selector: 'app-number-form-control',
    templateUrl: './number-form-control.component.html',
    styleUrls: ['./number-form-control.component.scss']
})
export class NumberFormControlComponent extends AbstractFormControlComponent<NumberFormControl> implements OnInit {
    @Input() override parentForm: FormGroup;
    @Input() override title: string;
    @Input() override controlName: string;
    @Input() placeholder: string;
    @Input() inline: boolean;

    faCheck: any = faCheck;

    get minLength(): number {
        return this.control.minLength;
    }

    get maxLength(): number {
        return this.control.maxLength;
    }

    public get placeholderText(): string {
        return this.placeholder || '';
    }

    get readOnlyCss(): boolean {
        return this.control.readOnlyCss || false;
    }

    public get isInline(): boolean {
        return this.inline || false;
    }

    ngOnInit(): void { }
}
