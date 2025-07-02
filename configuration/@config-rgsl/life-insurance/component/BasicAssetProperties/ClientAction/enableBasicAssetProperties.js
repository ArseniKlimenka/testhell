'use strict';

const constants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableBasicAssetProperties(input, ambientProperties) {

    const contractType = input.context.Dimensions.contractType;
    return isSaveOperationAvailable(this.view) && contractType == constants.contractType.Quote;
};
