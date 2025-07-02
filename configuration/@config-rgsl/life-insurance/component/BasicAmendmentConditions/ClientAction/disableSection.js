'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { equityLifeInsuranceAmendments } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function disableSection(input, ambientProperties) {
    const isEquityLifeInsuranceCancellation = ambientProperties.configurationCodeName === equityLifeInsuranceAmendments.EquityLifeInsuranceCancellation;
    const state = input.rootContext.State.Code;
    const availableStates = [amendmentConstants.cancellationAmendmentState.AwaitingDissolution, amendmentConstants.cancellationAmendmentState.AssetsSold];

    return isEquityLifeInsuranceCancellation && availableStates.includes(state);
};
