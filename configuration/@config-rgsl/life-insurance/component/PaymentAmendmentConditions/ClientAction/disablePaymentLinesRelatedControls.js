const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function disablePaymentLinesRelatedControls(input) {

    const state = input.context.State.Code;
    const amendmentReason = input.context.Body.basicAmendmentConditions.amendmentReason;

    const currentActor = input.rootContext.WorkUnitActor.CurrentActor;
    const isSaveAvailable = isSaveOperationAvailable(this.view);
    const isDocumentLocked = !isSaveAvailable || this.view.areAllElementsDisabled();
    const isSentToPayment = state === amendmentConstants.cancellationAmendmentState.SentToPayment;
    const isAwaitingPaymentNonDeath = state === amendmentConstants.cancellationAmendmentState.AwaitingPaymentDocuments &&
        (amendmentReason !== amendmentConstants.amendmentReason.holderDeath || currentActor !== actor.Operations);

    const recipients = input.componentContext.canellationRecipients ?? [];

    if (state === amendmentConstants.cancellationAmendmentState.AwaitingPaymentDocuments && isSaveAvailable && recipients.length === 0) {

        return false;
    }

    if (isSentToPayment || isAwaitingPaymentNonDeath || (isDocumentLocked && state !== amendmentConstants.cancellationAmendmentState.AwaitingPaymentDocuments)) {

        return true;
    }

    return false;
};
