'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { equityLifeInsuranceAmendments } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function disableValidFrom(input, ambientProperties) {

    const state = input.context.State.Code;
    const isEquityLifeInsuranceCancellation = ambientProperties.configurationCodeName === equityLifeInsuranceAmendments.EquityLifeInsuranceCancellation;
    const availableStates = [amendmentConstants.cancellationAmendmentState.AwaitingDissolution, amendmentConstants.cancellationAmendmentState.AssetsSold];
    if (isEquityLifeInsuranceCancellation && availableStates.includes(state)) {
        return false;
    }

    if (!isSaveOperationAvailable(this.view) || this.view.areAllElementsDisabled() || state === amendmentConstants.cancellationAmendmentState.SentToPayment) {

        return true;
    }

    const amendmentReason = input.componentContext.amendmentReason;
    return amendmentReason == amendmentConstants.amendmentReason.byClientCoolOff;
};
