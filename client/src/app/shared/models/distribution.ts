export class Distribution {
    id?: any;
    userId?: string;
    distribution?: ContainerShortModel[];
    createdAt?: Date;
    updatedAt?: Date;
}

export class ContainerShortModel {
    containerId?: string;
    parentId?: string;
    things: [
        {
            thingId: string;
        }
    ]
}