const { actorConstants, periodStatus } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function enableReopenPeriod(input) {
    const selection = input.context.selection;
    const currentActor = input.context.WorkUnitActor.CurrentActor;
    const allClosed = selection.every(_ => _.resultData.periodStatusId == periodStatus.CLOSED);

    if (selection &&
        selection.length > 0 &&
        allClosed &&
        (currentActor === actorConstants.CHIEF_ACCOUNTANT)) {
        this.enableElement();
    }
    else { this.disableElement(); }
};
