import { Component, EventEmitter, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SubscriptionHandler } from 'src/app/shared/components/subscriptionHandler';
import { ThingService } from 'src/app/api/thing.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ContainerService } from 'src/app/api/container.service';
import { combineLatest } from 'rxjs';
import { Container } from 'src/app/shared/models/container';
import { Thing } from 'src/app/shared/models/thing';
import { ContainerComponent, ThingMovedDetails } from '../container/container/container.component';
import { DistributionService } from 'src/app/api/distribution.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ContainerShortModel, Distribution } from 'src/app/shared/models/distribution';
import { ContainerPost } from 'src/app/shared/models/container-post';
import { arrayMove } from 'src/app/shared/extentions/extentions';
import { ParentChildDataService } from 'src/app/shared/services/parent-child-data.service';
import { getContainerChildUsedVolume, isContainerChild, isContainerParent } from 'src/app/shared/extentions/container.extentions';
import { collections } from 'src/app/shared/constants/collections';

@Component({
  selector: 'app-board-things',
  templateUrl: './board-things.component.html',
  styleUrls: ['./board-things.component.css']
})
export class BoardThingsComponent implements OnInit, OnDestroy {
  @ViewChildren(ContainerComponent) containerComponents: QueryList<ContainerComponent>
  public content?: string;
  public subscriptionHandler: SubscriptionHandler = new SubscriptionHandler();
  public containers: ContainerPost[];
  public allThings: Thing[];
  public things: Thing[];
  public containersIds: string[];
  public thingsIds: string[];
  public containersConnectedToList: string[];
  private distribution: Distribution;
  public recalculateContainers: EventEmitter<boolean> = new EventEmitter<false>;
  public containerThingsData: any = {};
  public containerChildData: any = {};
  public parentChildData: {};
  public isContainerParent = isContainerParent;
  public isContainerChild = isContainerChild;

  constructor(
    private containerService: ContainerService,
    private thingService: ThingService,
    private distributionService: DistributionService,
    private snackBarService: SnackBarService,
    public parentChildDataService: ParentChildDataService,
  ) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  retrieveData(): void {
    this.subscriptionHandler.subscriptions = combineLatest([
      this.containerService.getAll(),
      this.thingService.getAll(),
      this.distributionService.getCurrentUserDistribution()
    ]).subscribe(([containers, things, distribution]) => {
      this.containers = containers;
      this.containersIds = containers.map((item: Container) => {
        return item.id;
      })
      this.containersConnectedToList = [...this.containersIds, 'things']
      this.things = things;
      this.allThings = Object.assign([], things);
      this.thingsIds = things.map((item: Thing) => {
        return item.id;
      })
      this.restoreData(distribution);
      this.resortContainers();
      this.recalculateContainers.emit(true);
    });
  }

  restoreData(distribution?: Distribution): void {
    this.containerChildData = {};
    this.parentChildData = {};

    if (distribution) {
      this.distribution = distribution;

      this.containers.forEach((container: ContainerPost) => {
        const things = [];

        const containerInDistribution = this.distribution.distribution.find((dst: ContainerShortModel) => {
          return dst.containerId === container.id;
        });

        containerInDistribution?.things?.forEach(thingDistributed => {
          const foundIndex = this.things.findIndex((thing: Thing) => {
            return thing.id === thingDistributed.thingId;
          });

          if (foundIndex > -1) {
            const foundedThing = this.things[foundIndex];
            things.push(foundedThing);
            this.things.splice(foundIndex, 1);
          }
        });

        const parentId = containerInDistribution.parentId;
        this.containerThingsData[container.id] = things;
        container.parentId = parentId;

        if (parentId) {
          this.parentChildData[parentId] = container.id;
          this.containerChildData[parentId] = container.id;
        }
      });

      this.parentChildDataService.setParentChildData(this.parentChildData);
    }

  }

  resortContainers(): void {
    for (const parentId in this.parentChildData) {
      let parentIdIndex = this.containers.findIndex((cnt: ContainerPost) => {
        return cnt.id === parentId;
      });

      const childIdIndex = this.containers.findIndex((cnt: ContainerPost) => {
        return cnt.id === this.parentChildData[parentId];
      });

      if (parentIdIndex !== undefined && childIdIndex !== undefined) {
        if (childIdIndex > parentIdIndex) {
          this.containers = arrayMove(this.containers, childIdIndex, parentIdIndex + 1);
        } else {
          if (parentIdIndex === 0) {
            parentIdIndex = 1;
          }
          this.containers = arrayMove(this.containers, childIdIndex, parentIdIndex);
        }
      }
    }
  }

  getContainerThingsForInit(container: Container): Thing[] {
    if (!this.distribution || this.things?.length === 0) {
      return [];
    }

    const things = [];

    const containerInDistribution = this.distribution.distribution.find((dst: ContainerShortModel) => {
      return dst.containerId === container.id;
    });

    containerInDistribution?.things?.forEach(thingDistributed => {
      const foundIndex = this.things.findIndex((thing: Thing) => {
        return thing.id === thingDistributed.thingId;
      });


      if (foundIndex > -1) {
        const foundedThing = this.things[foundIndex];
        things.push(foundedThing);
      }

    });

    return things;
  }

  drop(event: CdkDragDrop<any>): void {
    const droppedThing = event.previousContainer.data[event.previousIndex];
    const currentContainerId = event.container.id;
    const previousContainerId = event.previousContainer.id;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.thingMoved({ droppedThing, previousContainerId, currentContainerId });
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  saveThingsDistribution(): void {
    const containersWithDistributions = this.containers.map((container: ContainerPost) => {
      return {
        containerId: container.id,
        parentId: container.parentId ?? null,
        things: container.things.map((thing: Thing) => {
          return {
            thingId: thing.id
          }
        })
      } as ContainerShortModel;
    });

    this.distributionService.create(containersWithDistributions).subscribe((data: any) => {
      this.snackBarService.show(collections.snackBar.successfulSavedDistribution);
    })
  }

  containerMoved(updatedDistribution: Distribution): void {
    this.restoreData(updatedDistribution);
    this.resortContainers();
    setTimeout(() => {
      this.recalculateContainers.emit(true);
    }, 1)
  }

  thingMoved(data: ThingMovedDetails): void {
    const indexOfTargetContainer = this.containers.findIndex((container: Container) => {
      return container.id === data.currentContainerId;
    });

    const indexOfSourceContainer = this.containers.findIndex((container: Container) => {
      return container.id === data.previousContainerId;
    })

    if (indexOfTargetContainer !== -1) {
      const container = this.containers[indexOfTargetContainer];
      let containerUsedVolume = container.things?.reduce((used, thing) => used + thing.volume, 0) ?? 0;

      if (isContainerParent(this.parentChildDataService, container.id)) {
        containerUsedVolume += getContainerChildUsedVolume(this.parentChildDataService, this.containers, container.id);
      }

      container.freeVolume = container.volume - (containerUsedVolume + data.droppedThing.volume);

      if (!container.things) {
        container.things = []
      }
      container.things.push(data.droppedThing);
      this.containers[indexOfTargetContainer] = Object.assign(container);
    }

    if (indexOfSourceContainer !== -1) {
      const container = this.containers[indexOfSourceContainer];
      const containerUsedVolume = container.things?.reduce((used, thing) => used + thing.volume, 0) ?? 0;

      container.freeVolume = container.volume - (containerUsedVolume - data.droppedThing.volume);
      container.things = container.things.filter((thing: Thing) => {
        return thing.id !== data.droppedThing.id;
      });
      this.containers[indexOfSourceContainer] = Object.assign(container);
    }

    this.recalculateContainers.emit(true);
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
  }
}
