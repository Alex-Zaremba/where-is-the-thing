import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { NameWithDigitsFormControl } from 'src/app/shared/form/name-with-digits-form-control/name-with-digits-form-control';
import { NumberFormControl } from 'src/app/shared/form/number-form-control/number-form-control';
import { Container } from 'src/app/shared/models/container';

@Component({
  selector: 'app-edit-container',
  templateUrl: './edit-container.component.html',
  styleUrls: ['./edit-container.component.css']
})
export class EditContainerComponent implements OnInit {
  public onClose: Subject<void> = new Subject<void>();
  public onSubmit: Subject<Container> = new Subject<Container>();

  public form: FormGroup;
  public container: Container;
  private containerOrigin: Container;
  public title: string;
  public submitBtnText: string;

  constructor(
    public bsModalRef: BsModalRef,
    public bsModalService: BsModalService,
  ) { }

  ngOnInit() {
    this.initNewFormGroup();

    if (this.container) {
      this.containerOrigin = Object.assign(this.container);
      this.restoreAnswersOnForm();
    }
    this.title = this.container ? 'Edit container' : 'Create container';
    this.submitBtnText = this.container ? 'Update' : 'Create';
  }

  initNewFormGroup(): void {
    this.form = new FormGroup({
      name: new NameWithDigitsFormControl(true, false),
      volume: new NumberFormControl(true, false, 1, null, true)
    });
  }

  restoreAnswersOnForm(): void {
    this.form.patchValue(this.container);
  }

  public onConfirm(): void {
    this.container = Object.assign(this.container ?? {}, this.form.getRawValue());
    this.onSubmit.next(this.container);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    if (this.containerOrigin) {
      this.container = Object.assign(this.containerOrigin);
    }

    this.onClose.next();
    this.bsModalRef.hide();
  }

}

