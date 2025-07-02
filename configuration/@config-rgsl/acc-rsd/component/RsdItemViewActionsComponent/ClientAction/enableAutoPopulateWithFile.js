const { rsdStatusIds, rsdActorNames } = require('@config-rgsl/acc-rsd/lib/rsdConsts');

module.exports = function enableAutoPopulateWithFile(input) {
    const state = input.rootContext.State?.Code;
    const currentActor = input.rootContext.WorkUnitActor.CurrentActor;
    return state === rsdStatusIds.DRAFT &&
        currentActor === rsdActorNames.CHIEF_ACCOUNTANT;
};
