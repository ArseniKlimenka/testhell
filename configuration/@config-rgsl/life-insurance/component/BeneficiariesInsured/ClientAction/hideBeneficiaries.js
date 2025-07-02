'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function hideBeneficiaries(input) {

    const productGroup = getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productGroup');
    const isMedGroup = productGroup == lifeInsuranceConstants.productGroup.DMS.descriptionRU;

    return !isMedGroup;

};
