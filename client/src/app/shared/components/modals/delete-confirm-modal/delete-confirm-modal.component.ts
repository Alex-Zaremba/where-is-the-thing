import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.scss']
})
export class DeleteConfirmModalComponent implements OnInit {
  public onClose: Subject<boolean> = new Subject<boolean>();
  public onDelete: Subject<boolean> = new Subject<boolean>();
  public body: string;
  public title: string;

  constructor(public bsModalRef: BsModalRef) { }

  public ngOnInit(): void { }

  public onConfirm(): void {
    this.onDelete.next(true);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
