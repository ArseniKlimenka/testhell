const { actorConstants } = require('@config-rgsl/acc-cash-flow/lib/constantsAndEnums');

module.exports = function enableCancelPaymentButtonOnSelection(input) {
    const context = input.context;
    const currentActor = context.WorkUnitActor.CurrentActor;

    if (context.selection &&
        context.selection.length > 0 &&
        (currentActor === actorConstants.CHIEF_PAYMENT_DISTRIBUTOR)) {
        this.enableElement();
    }
    else { this.disableElement(); }
};
