const { bankStatementItemStatusId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');
const { actorConstants } = require('@config-rgsl/acc-cash-flow/lib/constantsAndEnums');

module.exports = function enableUpdatePaymentDescriptionOnSelection(input) {
    const allowedStatuses = [
        bankStatementItemStatusId.NOT_ALLOCATED,
        bankStatementItemStatusId.PARTIALLY_ALLOCATED,
    ];
    const context = input.context;
    const currentActor = context.WorkUnitActor.CurrentActor;

    if (context.selection &&
        context.selection.every(item => allowedStatuses.includes(item.resultData.paymentStatusId)) &&
        (currentActor === actorConstants.CHIEF_PAYMENT_DISTRIBUTOR)) {
        this.enableElement();
    }
    else { this.disableElement(); }
};
