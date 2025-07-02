'use strict';

const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function hideOrganisationLookUpInputs(input, ambientProperties) {

    const isCollectivePolicy = input.rootContext.ConfigurationCodeName == 'CollectiveLifeInsurancePolicy';
    if (isCollectivePolicy) {
        return true;
    }

    const body = input.context.Body;

    const productConf = body?.productConfiguration ?? {};
    const hideOrganisationLookUp = Object.keys(productConf).length == 0 || productConf.policyHolderType == partyType.NaturalPerson;

    return hideOrganisationLookUp || input?.context?.ClientViewModel?.hidePartyLookUpSearchLookUpInputs;

};
