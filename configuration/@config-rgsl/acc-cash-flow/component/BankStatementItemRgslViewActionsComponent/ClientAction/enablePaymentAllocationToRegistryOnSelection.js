const { actorConstants } = require('@config-rgsl/acc-cash-flow/lib/constantsAndEnums');
const {
    bankStatementItemSourceId,
    bankStatementDirection,
    bankStatementItemStatusId,
} = require('@config-rgsl/acc-base/lib/bankStatementEnums');

module.exports = function enablePaymentAllocationToRegistryOnSelection(input) {
    const context = input.context;
    const currentActor = context.WorkUnitActor.CurrentActor;

    if (context.selection &&
        context.selection.length > 0 &&
        context.selection.every(_ => _.resultData.paymentSourceId === bankStatementItemSourceId.BANK_STATEMENT) &&
        context.selection.every(_ => _.resultData.isRegistry) &&
        context.selection.every(_ => _.resultData.direction === bankStatementDirection.INCOMING) &&
        context.selection.every(_ => _.resultData.paymentStatusId === bankStatementItemStatusId.NOT_ALLOCATED) &&
        (currentActor === actorConstants.CHIEF_PAYMENT_DISTRIBUTOR)) {
        this.enableElement();
    }
    else { this.disableElement(); }
};
