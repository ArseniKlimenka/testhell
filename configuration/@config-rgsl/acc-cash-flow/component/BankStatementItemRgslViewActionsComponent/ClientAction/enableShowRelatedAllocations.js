const { actorConstants } = require('@config-rgsl/acc-cash-flow/lib/constantsAndEnums');

module.exports = function enableShowRelatedAllocations(input) {
    const context = input.context;
    const currentActor = context.WorkUnitActor.CurrentActor;

    if (context.selection &&
        context.selection.length === 1) {
        this.enableElement();
    }
    else { this.disableElement(); }
};
