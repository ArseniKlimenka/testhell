'use strict';

const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function hidePersonLookUpInputs(input, ambientProperties) {

    const isCollectivePolicy = input.rootContext.ConfigurationCodeName == 'CollectiveLifeInsurancePolicy';
    if (isCollectivePolicy) {
        return true;
    }

    const body = input.context.Body;

    const productConf = body?.productConfiguration ?? {};
    const hidePersonLookUp = Object.keys(productConf).length != 0 && productConf.policyHolderType == partyType.LegalEntity;

    return hidePersonLookUp || input?.context?.ClientViewModel?.hidePartyLookUpSearchLookUpInputs;

};
