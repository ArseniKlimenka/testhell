'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function hideAdditionalBeneficiaries(input) {

    const productGroup = getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productGroup');
    const isMedGroup = productGroup == lifeInsuranceConstants.productGroup.DMS.descriptionRU;
    const isChangeAmendment = input.rootContext.Dimensions?.amendmentType === "NonFinancialChange";
    const hasAdditionalBeneficiaries = input?.componentContext?.length > 0 ?? false;

    return isMedGroup || (!isChangeAmendment && !hasAdditionalBeneficiaries);
};
