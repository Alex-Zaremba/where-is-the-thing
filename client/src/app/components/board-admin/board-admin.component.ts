import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../api/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SubscriptionHandler } from 'src/app/shared/components/subscriptionHandler';
import { EditContainerComponent } from '../container/edit-container/edit-container.component';
import { Container } from 'src/app/shared/models/container';
import { ContainerService } from 'src/app/api/container.service';
import { combineLatest } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { DeleteConfirmModalComponent } from 'src/app/shared/components/modals/delete-confirm-modal/delete-confirm-modal.component';
import { ThingService } from 'src/app/api/thing.service';
import { Thing } from 'src/app/shared/models/thing';
import { EditThingComponent } from '../thing/edit-thing/edit-thing.component';
import { collections } from 'src/app/shared/constants/collections';
import { DistributionService } from 'src/app/api/distribution.service';
import { Distribution } from 'src/app/shared/models/distribution';
import { isContainerUsedForSomeDistribution } from 'src/app/shared/extentions/container.extentions';
import { isThingUsedForSomeDistribution } from 'src/app/shared/extentions/thing.extentions';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit, OnDestroy {
  public subscriptionHandler: SubscriptionHandler = new SubscriptionHandler();
  public content?: string;
  public containers: Container[];
  public things: Thing[];
  public distributions: Distribution[];

  constructor(
    private userService: UserService,
    private bsModalService: BsModalService,
    private containerService: ContainerService,
    private thingService: ThingService,
    private snackBarService: SnackBarService,
    private distributionService: DistributionService,
  ) { }

  ngOnInit(): void {
    this.subscriptionHandler.subscriptions = this.userService.getAdminBoard().subscribe((resp: any) => {
      this.content = resp.message;
    });
    this.retrieveData();
  }

  retrieveData(): void {
    this.subscriptionHandler.subscriptions = combineLatest([
      this.containerService.getAll(),
      this.thingService.getAll(),
      this.distributionService.getAll(),
    ]).subscribe(([containers, things, distributions]) => {
      this.containers = containers;
      this.things = things;
      this.distributions = distributions;
    });
  }

  addContainer(): void {
    const modal = this.bsModalService.show(EditContainerComponent, {
      initialState: {}
    });

    this.subscriptionHandler.subscriptions = modal.content.onSubmit.subscribe(async (container: Container) => {
      this.containerService.create(container).subscribe((resp: any) => {
        this.snackBarService.show(collections.snackBar.succesfullyAddedContainer);
        this.retrieveData();
      })
    });
  }

  editContainer(container: Container): void {
    const modal = this.bsModalService.show(EditContainerComponent, {
      initialState: {
        container
      }
    });

    this.subscriptionHandler.subscriptions = modal.content.onSubmit.subscribe(async (container: Container) => {
      this.containerService.update(container.id, container).subscribe((resp: any) => {
        this.snackBarService.show(collections.snackBar.succesfullyUpdatedContainer);
        this.retrieveData();
      })
    });
  }

  deleteContainer(container: Container): void {
    if (isContainerUsedForSomeDistribution(container.id, this.distributions)) {
      this.snackBarService.show(collections.snackBar.cannotDeleteContainer);
      return;
    }

    const modal = this.bsModalService.show(DeleteConfirmModalComponent, {
      initialState: {
        title: collections.snackBar.deleteContainerTitle,
        body: collections.snackBar.sureDelete + container.name + '?'
      }
    });

    modal.content.onDelete.subscribe(() => {
      this.containerService.delete(container.id).subscribe((resp: any) => {
        this.snackBarService.show(collections.snackBar.succesfullyDeletedContainer);
        this.retrieveData();
      })
    });
  }


  addThing(): void {
    const modal = this.bsModalService.show(EditThingComponent, {
      initialState: {}
    });

    this.subscriptionHandler.subscriptions = modal.content.onSubmit.subscribe(async (thing: Thing) => {
      this.thingService.create(thing).subscribe((resp: any) => {
        this.snackBarService.show(collections.snackBar.succesfullyAddedThing);
        this.retrieveData();
      })
    });
  }

  editThing(thing: Thing): void {
    const modal = this.bsModalService.show(EditThingComponent, {
      initialState: {
        thing
      }
    });

    this.subscriptionHandler.subscriptions = modal.content.onSubmit.subscribe(async (thing: Thing) => {
      this.thingService.update(thing.id, thing).subscribe((resp: any) => {
        this.snackBarService.show(collections.snackBar.succesfullyUpdatedThing);
        this.retrieveData();
      })
    });
  }

  deleteThing(thing: Thing): void {
    if (isThingUsedForSomeDistribution(thing.id, this.distributions)) {
      this.snackBarService.show(collections.snackBar.cannotDeleteThing);
      return;
    }

    const modal = this.bsModalService.show(DeleteConfirmModalComponent, {
      initialState: {
        title: collections.snackBar.deleteThingTitle,
        body: collections.snackBar.sureDelete + thing.name + '?'
      }
    });

    modal.content.onDelete.subscribe(() => {
      this.thingService.delete(thing.id).subscribe((resp: any) => {
        this.snackBarService.show(collections.snackBar.succesfullyDeletedThing);
        this.retrieveData();
      })
    });
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
  }

}
