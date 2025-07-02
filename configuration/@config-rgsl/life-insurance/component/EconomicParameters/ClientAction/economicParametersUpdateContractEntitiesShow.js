'use strict';

module.exports = function economicParametersUpdateContractEntitiesShow(input) {

    const stateCode = input.context?.State?.Code;
    const configurationCodeName = input.rootContext.ConfigurationCodeName;
    const isActivated = stateCode == 'Activated';
    const isProductConfiguration = configurationCodeName == 'ProductConfiguration';

    if (isProductConfiguration && isActivated) {
        return true;
    }
};
