import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { modalCssClass, modalTypes } from '../modals.enums';

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html',
})
export class AlertModalComponent implements OnInit {
    public body: string;
    public title: string;
    public cssClass: string;
    public type: number = 1;
    public onClose: Subject<boolean>;
    public faClose: any = faTimes;

    public constructor(private bsModalRef: BsModalRef) { }

    public ngOnInit(): void {
        this.onClose = new Subject();

        switch (this.type) {
            case modalTypes.error: {
                this.cssClass = modalCssClass.error
                break;
            }
            case modalTypes.warning: {
                this.cssClass = modalCssClass.warning
                break;
            }
            case modalTypes.info: {
                this.cssClass = modalCssClass.info
                break;
            }
        }
    }

    public show(body: string): void {
        this.body = body;
    }

    public hideModal(moveNextStep?: boolean): void {
        this.onClose.next(moveNextStep);
        this.onClose.complete();
        this.bsModalRef.hide();
    }

    get isErrorType(): boolean {
        return this.type === modalTypes.error;
    }
}
