const { actorConstants } = require('@config-rgsl/acc-cash-flow/lib/constantsAndEnums');
const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function enableCancelAllocationButtonOnSelection(input) {
    const context = input.context;
    const currentActor = context.WorkUnitActor.CurrentActor;

    const allowedDocumentTypeIds = [
        allocationDocumentType.POLICY,
        allocationDocumentType.PAYMENT_ORDER_OUTGOING,
    ];

    if (context.selection &&
        context.selection.length > 0 &&
        (currentActor === actorConstants.CHIEF_PAYMENT_DISTRIBUTOR) &&
        context.selection.every(_ =>
            allowedDocumentTypeIds.includes(_.resultData.documentTypeId) &&
            (!_.resultData.fake || _.isMigrated)
        )) {
        this.enableElement();
    }
    else { this.disableElement(); }
};
