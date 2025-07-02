const { actorConstants } = require('@config-rgsl/acc-base/lib/accConsts');
const { rsdStatusIds } = require('@config-rgsl/acc-rsd/lib/rsdConsts');

module.exports = function enableAutoPopulate(input) {

    const context = input.context;
    const currentActor = context.WorkUnitActor.CurrentActor;

    return context.Number !== undefined &&
        currentActor === actorConstants.CHIEF_ACCOUNTANT &&
        context.State.Code === rsdStatusIds.DRAFT &&
        !this.view.isDirty();
};
