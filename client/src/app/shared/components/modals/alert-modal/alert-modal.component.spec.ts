import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertModalComponent } from './alert-modal.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

describe('AlertModalComponent', () => {
    let component: AlertModalComponent;
    let fixture: ComponentFixture<AlertModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ModalModule],
            declarations: [AlertModalComponent],
            providers: [BsModalRef],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
