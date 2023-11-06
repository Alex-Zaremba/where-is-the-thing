import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { NameWithDigitsFormControl } from 'src/app/shared/form/name-with-digits-form-control/name-with-digits-form-control';
import { NumberFormControl } from 'src/app/shared/form/number-form-control/number-form-control';
import { Thing } from 'src/app/shared/models/thing';

@Component({
  selector: 'app-edit-thing',
  templateUrl: './edit-thing.component.html',
  styleUrls: ['./edit-thing.component.css']
})
export class EditThingComponent implements OnInit {
  public onClose: Subject<void> = new Subject<void>();
  public onSubmit: Subject<Thing> = new Subject<Thing>();

  public form: FormGroup;
  public thing: Thing;
  private thingOrigin: Thing;
  public title: string;
  public submitBtnText: string;

  constructor(
    public bsModalRef: BsModalRef,
    public bsModalService: BsModalService,
  ) { }

  ngOnInit() {
    this.initNewFormGroup();

    if (this.thing) {
      this.thingOrigin = Object.assign(this.thing);
      this.restoreAnswersOnForm();
    }
    this.title = this.thing ? 'Edit thing' : 'Create thing';
    this.submitBtnText = this.thing ? 'Update' : 'Create';
  }

  initNewFormGroup(): void {
    this.form = new FormGroup({
      name: new NameWithDigitsFormControl(true, false),
      volume: new NumberFormControl(true, false, 1, null, true)
    });
  }

  restoreAnswersOnForm(): void {
    this.form.patchValue(this.thing);
  }

  public onConfirm(): void {
    this.thing = Object.assign(this.thing ?? {}, this.form.getRawValue());
    this.onSubmit.next(this.thing);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    if (this.thingOrigin) {
      this.thing = Object.assign(this.thingOrigin);
    }

    this.onClose.next();
    this.bsModalRef.hide();
  }

}
