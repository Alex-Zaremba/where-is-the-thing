import { ContainerPost } from "../models/container-post";
import { ContainerShortModel, Distribution } from "../models/distribution";
import { Thing } from "../models/thing";

function isContainerMovingAvailable(containersOrig: ContainerPost[], distributionArr: ContainerShortModel[]): boolean {
    let rootsChildsData = {};
    let isContainerMovingAvailable = true;

    distributionArr.forEach((dst: ContainerShortModel) => {
        if (!!dst.parentId) {
            rootsChildsData[dst.parentId] = dst;
        };
    });

    for (const rootId in rootsChildsData) {
        const rootContainer = containersOrig.find((orig: ContainerPost) => {
            return orig.id === rootId;
        });

        const childContainer = containersOrig.find((orig: ContainerPost) => {
            return orig.id === rootsChildsData[rootId].containerId;
        });

        const rootContainerUsedVolume = rootContainer.things?.reduce((used, thing) => used + thing.volume, 0) ?? 0;
        const rootContainerFreeVolume = rootContainer.volume - rootContainerUsedVolume;

        const childContainerUsedVolume = childContainer.things?.reduce((used, thing) => used + thing.volume, 0) ?? 0;

        if (rootContainerFreeVolume - childContainerUsedVolume < 0) {
            isContainerMovingAvailable = false
        }
    }

    return isContainerMovingAvailable;
}

function processOrigContainersBeforeMovingSave(containersOrig: ContainerPost[], distributionArr: ContainerShortModel[], prevParentContainerId: string): void {
    let rootsChildsData = {};

    distributionArr.forEach((dst: ContainerShortModel) => {
        if (!!dst.parentId) {
            rootsChildsData[dst.parentId] = dst;
        };
    });

    for (const rootId in rootsChildsData) {
        const prevRootContainer = containersOrig.find((orig: ContainerPost) => {
            return orig.id === prevParentContainerId;
        });

        const rootContainer = containersOrig.find((orig: ContainerPost) => {
            return orig.id === rootId;
        });

        const childContainer = containersOrig.find((orig: ContainerPost) => {
            return orig.id === rootsChildsData[rootId].containerId;
        });

        if (prevRootContainer) {
            const prevRootContainerUsedVolume = prevRootContainer.things?.reduce((used, thing) => used + thing.volume, 0) ?? 0;
            prevRootContainer.freeVolume = prevRootContainer.volume - prevRootContainerUsedVolume;
        }

        const rootContainerUsedVolume = rootContainer.things?.reduce((used, thing) => used + thing.volume, 0) ?? 0;
        rootContainer.freeVolume = rootContainer.volume - rootContainerUsedVolume;

        const childContainerUsedVolume = childContainer.things?.reduce((used, thing) => used + thing.volume, 0) ?? 0;
        childContainer.freeVolume = childContainer.volume - childContainerUsedVolume;
    }
}

function getContainerChildId(parentChildDataService: any, containerId: string): string {
    return parentChildDataService.parentChildData?.[containerId];
}

function isContainerParent(parentChildDataService, containerId: string): boolean {
    return !!getContainerChildId(parentChildDataService, containerId);
}

function isContainerChild(parentChildDataService, containerId: string): boolean {
    let isChild = false;

    for (const parentId in parentChildDataService.parentChildData) {
        if (parentChildDataService.parentChildData?.[parentId] === containerId) {
            isChild = true;
        }
    }

    return isChild;
}

function getContainerChildUsedVolume(parentChildDataService, containers: ContainerPost[], containerId: string): number {
    const childContainerId = getContainerChildId(parentChildDataService, containerId);
    const childContainer = containers.find((cnt: ContainerPost) => {
        return cnt.id === childContainerId;
    })
    return childContainer.things?.reduce((used, thing) => used + thing.volume, 0) ?? 0;
}

function getContainerParentUsedVolume(parentChildDataService, containers: ContainerPost[], parentContainerId: string): number {
    const parentContainer = containers.find((cnt: ContainerPost) => {
        return cnt.id === parentContainerId;
    })
    return parentContainer.things?.reduce((used, thing) => used + thing.volume, 0) ?? 0;
}

function isAvailableVolumeForThing(parentChildDataService: any, droppedThing: Thing, container: ContainerPost, currentContainerData: Thing[], containers: ContainerPost[]): boolean {
    if (isContainerChild(parentChildDataService, container.id)) {     // case: validate container 50 like child container 10 + moving thing 40 in container 50
        const currentContainerMaxVolume = container.volume;
        const currentContainerUsedVolume = currentContainerData.reduce((used, thing) => used + thing.volume, 0) ?? 0;
        const isEnoughFreeVolumeInCurrentContainer = (currentContainerMaxVolume - currentContainerUsedVolume) >= droppedThing.volume;

        if (!isEnoughFreeVolumeInCurrentContainer) {
            return false;
        }

        const parentContainer = containers.find((cnt: ContainerPost) => {
            return cnt.id === container.parentId;
        })

        const parentContainerMaxVolume = parentContainer.volume;
        const parentContainerUsedVolume = parentContainer.things.reduce((used, thing) => used + thing.volume, 0) ?? 0;

        if (parentContainerMaxVolume - parentContainerUsedVolume - currentContainerUsedVolume < droppedThing.volume) {
            return false;
        }
    }

    const maxVolume = container.volume;
    let containerUsedVolume = currentContainerData.reduce((used, thing) => used + thing.volume, 0) ?? 0;

    if (isContainerParent(parentChildDataService, container.id)) {
        containerUsedVolume += getContainerChildUsedVolume(parentChildDataService, containers, container.id);
    }

    const isEnoughFreeVolume = (maxVolume - containerUsedVolume) >= droppedThing.volume;

    return isEnoughFreeVolume;
}

function recalculateFlatListOfContainers(containers: ContainerPost[]): void {
    containers.forEach((container: ContainerPost) => {
        const containerUsedValue = container.things?.reduce((used, thing) => used + thing.volume, 0) ?? 0;
        container.freeVolume = container.volume - containerUsedValue;
    })
}

function recalculateContainer(childContainerId: string, containers: ContainerPost[], container: ContainerPost): void {
    const childContainer = containers.find((cnt: ContainerPost) => {
        return cnt.id === childContainerId;
    });

    const childContainerUsedValue = childContainer.things?.reduce((used, thing) => used + thing.volume, 0) ?? 0;
    const containerUsedValue = container.things?.reduce((used, thing) => used + thing.volume, 0) ?? 0;

    container.freeVolume = container.volume - childContainerUsedValue - containerUsedValue;
}

function isContainerUsedForSomeDistribution(containerId: string, distributions: Distribution[]): boolean {
    let used = false;

    distributions.forEach((dst: Distribution) => {
        const containerToBeDeleted = dst.distribution.find((cnt: ContainerShortModel) => {
            return cnt.containerId === containerId;
        })

        if (containerToBeDeleted?.things?.length > 0 || containerToBeDeleted?.parentId) {
            used = true;
        }

        const rootContainersIds = [...new Set(dst.distribution.map((cnt: ContainerShortModel) => {
            return cnt.parentId;
        }))].filter((id: string) => {
            return id !== null;
        })

        if (rootContainersIds?.indexOf(containerId) !== -1) {
            used = true;
        }
    })

    return used;
}

export {
    isContainerMovingAvailable,
    processOrigContainersBeforeMovingSave,
    getContainerChildId,
    isContainerParent,
    isContainerChild,
    getContainerChildUsedVolume,
    isAvailableVolumeForThing,
    recalculateContainer,
    recalculateFlatListOfContainers,
    getContainerParentUsedVolume,
    isContainerUsedForSomeDistribution
}