import { Thing } from "./thing";

export class ContainerPost {
    id?: any;
    name?: string;
    volume?: number;
    createdAt?: Date;
    updatedAt?: Date;

    parentId?: string;
    isParent?: boolean;
    freeVolume?: number;
    things?: Thing[];
}