import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { fromEvent, merge, Observable, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { SubscriptionHandler } from '../../components/subscriptionHandler';
import { AbstractFormControlComponent } from '../abstract-form-control.component';
import { EmailFormControl } from './email-form-control';

@Component({
    selector: 'app-email-form-control',
    templateUrl: './email-form-control.component.html',
})
export class EmailFormControlComponent extends AbstractFormControlComponent<EmailFormControl> implements OnInit, OnDestroy {
    @Input() override parentForm: FormGroup;
    @Input() override title: string;
    @Input() override controlName: string;
    @Input() placeholder: string;
    @Output() onChange: EventEmitter<any> = new EventEmitter();

    faCheck: any = faCheck;
    subscriptionHandler: SubscriptionHandler = new SubscriptionHandler();

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.subscriptionHandler.subscriptions = this.bindKeypressEvent().subscribe(($event: KeyboardEvent) => this.onKeyPress($event));
    }

    change(): void {
        this.onChange.emit(this.control.value);
    }

    ngOnDestroy(): void {
        this.subscriptionHandler.unsubscribeAll();
    }

    public get minLength(): number {
        return this.control.minLength;
    }

    public get maxLength(): number {
        return this.control.maxLength;
    }

    public get placeholderText(): string {
        return this.placeholder || '';
    }

    onKeyPress($event: KeyboardEvent) {
        if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 86) {
            this.onChange.emit(this.control.value);
        }
    }

    private bindKeypressEvent(): Observable<KeyboardEvent> {
        const eventsType$ = [
            fromEvent(window, 'keypress'),
            fromEvent(window, 'keydown')
        ];

        return merge(...eventsType$)
            .pipe(
                debounce(() => timer(10)),
                map(state => (state as KeyboardEvent))
            );
    }
}
