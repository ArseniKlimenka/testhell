'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { equityLifeInsuranceAmendments } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function disableFullPackageReceived(input, ambientProperties) {

    const state = input.context.State.Code;
    const availableStates = [amendmentConstants.cancellationAmendmentState.AwaitingDissolution, amendmentConstants.cancellationAmendmentState.AssetsSold];
    const isEquityLifeInsuranceCancellation = ambientProperties.configurationCodeName === equityLifeInsuranceAmendments.EquityLifeInsuranceCancellation
        && availableStates.includes(state);

    if ((!isSaveOperationAvailable(this.view) || this.view.areAllElementsDisabled() || isEquityLifeInsuranceCancellation) &&
        state !== amendmentConstants.cancellationAmendmentState.AwaitingPaymentDocuments) {

        return true;
    }

    return false;
};
