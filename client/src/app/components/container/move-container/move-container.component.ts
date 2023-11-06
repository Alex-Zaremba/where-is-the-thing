import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { collections } from 'src/app/shared/constants/collections';
import { isContainerMovingAvailable, processOrigContainersBeforeMovingSave } from 'src/app/shared/extentions/container.extentions';
import { DropDownFormControl } from 'src/app/shared/form/dropdown-form-control/dropdown-form-control';
import { Container } from 'src/app/shared/models/container';
import { ContainerPost } from 'src/app/shared/models/container-post';
import { ContainerShortModel } from 'src/app/shared/models/distribution';
import { Thing } from 'src/app/shared/models/thing';
import { ParentChildDataService } from 'src/app/shared/services/parent-child-data.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-move-container',
  templateUrl: './move-container.component.html',
  styleUrls: ['./move-container.component.css']
})
export class MoveContainerComponent implements OnInit {
  public onClose: Subject<void> = new Subject<void>();
  public onSubmit: Subject<ContainerShortModel[]> = new Subject<ContainerShortModel[]>();

  public form: FormGroup;
  public container: ContainerPost;
  public containers: ContainerPost[];
  public containersCollection: Container[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    public bsModalService: BsModalService,
    public parentChildDataService: ParentChildDataService,
    public snackBarService: SnackBarService,
  ) { }

  ngOnInit() {
    if (this.containers) {
      if (this.container.parentId) {
        this.containersCollection = [
          { name: 'Root', id: 'root' } // in case we need to move from some container
        ]
      }

      this.containersCollection = [...this.containersCollection, ...this.containers.filter((container: ContainerPost) => {
        return container.id !== this.container.id &&
          !this.isConteinerHasConteiner(container.id) &&
          !this.isConteinerChild(container.id);
      })];
    }

    this.initNewFormGroup();
  }

  isConteinerHasConteiner(containerId: string): boolean {
    return !!this.parentChildDataService.parentChildData?.[containerId];
  }

  isConteinerChild(containerId: string): boolean {
    let isChild = false;

    if (!this.parentChildDataService.parentChildData) {
      return false;
    }

    for (const parentId in this.parentChildDataService.parentChildData) {
      if (this.parentChildDataService.parentChildData[parentId] === containerId) {
        isChild = true;
      }
    }

    return isChild;
  }

  initNewFormGroup() {
    this.form = new FormGroup({
      targetContainer: new DropDownFormControl(true, false, {
        valuePropertyName: 'name',
        keyPropertyName: 'id',
        collection: this.containersCollection
      }, {}),
    })
  }

  public onConfirm(): void {
    let containersWithDistributions = this.containers.map((container: ContainerPost) => {
      return {
        containerId: container.id,
        things: container.things.map((thing: Thing) => {
          return {
            thingId: thing.id
          }
        })
      } as ContainerShortModel;
    });

    containersWithDistributions.forEach((cnt: ContainerShortModel) => {
      const targetContainerId = this.form.get('targetContainer').value;
      if (cnt.containerId === this.container.id) {
        cnt.parentId = targetContainerId === 'root' ? null : targetContainerId;
      }
    })

    if (!isContainerMovingAvailable(this.containers, containersWithDistributions)) {
      this.snackBarService.show(collections.snackBar.notEnoughVolume);
      return;
    } else {
      processOrigContainersBeforeMovingSave(this.containers, containersWithDistributions, this.container.parentId);
      this.onSubmit.next(containersWithDistributions);
      this.bsModalRef.hide();
    }
  }

  public onCancel(): void {
    this.onClose.next();
    this.bsModalRef.hide();
  }
}

export class MoveContainerData {
  container: ContainerPost;
  targetContainerId: string;
}
