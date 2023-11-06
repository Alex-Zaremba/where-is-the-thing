import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Container } from 'src/app/shared/models/container';
import { Thing } from 'src/app/shared/models/thing';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { MoveContainerComponent } from '../move-container/move-container.component';
import { SubscriptionHandler } from 'src/app/shared/components/subscriptionHandler';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ContainerPost } from 'src/app/shared/models/container-post';
import { DistributionService } from 'src/app/api/distribution.service';
import { ContainerShortModel, Distribution } from 'src/app/shared/models/distribution';
import { ParentChildDataService } from 'src/app/shared/services/parent-child-data.service';
import { isAvailableVolumeForThing, isContainerChild, isContainerParent, recalculateContainer, recalculateFlatListOfContainers } from 'src/app/shared/extentions/container.extentions';
import { isEmpty } from 'src/app/shared/extentions/extentions';
import { collections } from 'src/app/shared/constants/collections';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, OnDestroy, OnChanges {
  public subscriptionHandler: SubscriptionHandler = new SubscriptionHandler();
  @Input() connectedTo: Array<any>;
  @Input() container: ContainerPost;
  @Input() containers: ContainerPost[];
  @Input() containerThingsData: any;
  @Input() containerChildData: any;
  @Input() recalculateContainers: EventEmitter<boolean>;
  @Output() thingMoved = new EventEmitter<ThingMovedDetails>();
  @Output() containerMoved = new EventEmitter<Distribution>();

  public containerThings: Thing[] = [];

  constructor(
    private snackBarService: SnackBarService,
    private bsModalService: BsModalService,
    private distributionService: DistributionService,
    private parentChildDataService: ParentChildDataService,
  ) {
  }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions(): void {
    this.subscriptionHandler.subscriptions = this.recalculateContainers.subscribe(() => {
      const childContainerId = this.containerChildData[this.container.id];

      if (isEmpty(this.containerChildData)) {
        recalculateFlatListOfContainers(this.containers);
      } else if (childContainerId) {
        setTimeout(() => {
          recalculateContainer(childContainerId, this.containers, this.container);
        })
      }
    })
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    const containersChanges = changes?.['containers'] &&
      changes?.['containers'].currentValue !== undefined &&
      JSON.stringify(changes?.['containers'].currentValue) !== JSON.stringify(changes?.['containers'].previousValue);

    if (containersChanges) {
      const thingsToBeInited = this.containerThingsData[this.container.id];

      thingsToBeInited?.forEach((thing: Thing) => {
        this.thingMoved.next({ droppedThing: thing, previousContainerId: 'things', currentContainerId: this.container.id });
        this.containerThings.push(thing);
      });

      const childContainerId = this.containerChildData[this.container.id];

      if (childContainerId) {
        recalculateContainer(childContainerId, this.containers, this.container);
      }
    }
  }

  drop(event: CdkDragDrop<any[]>): void {
    const droppedThing = event.previousContainer.data[event.previousIndex];
    const currentContainerId = event.container.id;
    const previousContainerId = event.previousContainer.id;
    const currentContainerData = event.container.data;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (isAvailableVolumeForThing(this.parentChildDataService, droppedThing, this.container, currentContainerData, this.containers)) {
        this.thingMoved.next({ droppedThing, previousContainerId, currentContainerId });
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      } else {
        this.snackBarService.show(collections.snackBar.notEnoughVolumeFor + droppedThing.name);
      }
    }
  }

  moveContainer(container: Container): void {
    const modal = this.bsModalService.show(MoveContainerComponent, {
      initialState: {
        container: container,
        containers: this.containers
      }
    });

    this.subscriptionHandler.subscriptions = modal.content.onSubmit.subscribe(async (containersWithDistributions: ContainerShortModel[]) => {
      this.distributionService.create(containersWithDistributions).subscribe((data: Distribution) => {
        this.snackBarService.show(collections.snackBar.successfulUpdatedDistribution);
        this.containerMoved.next(data);
      })
    });
  }

  get isContainerParent(): boolean {
    return isContainerParent(this.parentChildDataService, this.container.id);
  }

  get isContainerChild(): boolean {
    return isContainerChild(this.parentChildDataService, this.container.id);
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
  }
}

export class ThingMovedDetails {
  droppedThing: Thing;
  previousContainerId: string;
  currentContainerId: string;
}
