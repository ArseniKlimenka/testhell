'use strict';

const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function policyHolderLegalEntityShow(input, ambientProperties) {

    const policyHolderPartyType = input.context.Body.technicalData?.policyParties?.holder?.partyType;
    return policyHolderPartyType === partyType.LegalEntity;
};
