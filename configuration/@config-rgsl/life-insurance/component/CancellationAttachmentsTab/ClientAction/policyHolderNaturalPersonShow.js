'use strict';

const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function policyHolderNaturalPersonShow(input) {

    const policyHolderPartyType = input.context.Body.technicalData?.policyParties?.holder?.partyType;
    return policyHolderPartyType === partyType.NaturalPerson;
};
