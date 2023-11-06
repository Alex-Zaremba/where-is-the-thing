import { Distribution } from "../models/distribution";

function isThingUsedForSomeDistribution(thingId: string, distributions: Distribution[]): boolean {
    let used = JSON.stringify(distributions).indexOf(thingId) !== -1;

    return used;
}

export {
    isThingUsedForSomeDistribution
}