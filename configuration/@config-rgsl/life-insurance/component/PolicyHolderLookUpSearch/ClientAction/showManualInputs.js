'use strict';

const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function showManualInputs(input, ambientProperties) {

    const isCollectivePolicy = input.rootContext.ConfigurationCodeName == 'CollectiveLifeInsurancePolicy';
    if (isCollectivePolicy) {
        return false;
    }

    const body = input.context.Body;

    const productConf = body?.productConfiguration ?? {};
    const hidePersonData = Object.keys(productConf).length != 0 && productConf.policyHolderType == partyType.LegalEntity;

    const contractType = input?.context?.Dimensions?.contractType;
    return !hidePersonData && ["Quote", "Policy"].includes(contractType);

};
