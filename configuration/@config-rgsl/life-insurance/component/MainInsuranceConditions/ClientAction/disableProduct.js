'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function disableProduct(input) {

    if (!isSaveOperationAvailable(this.view) || shouldDisableSaveableContract(input, this.view)) {

        return true;
    }

    const partnerCode = input.componentContext.partner?.partnerCode;
    if (!partnerCode) {

        return true;
    }

    const documentStateCode = input.context.State.Code;
    const isOnReview = documentStateCode == lifeInsuranceConstants.quoteState.OnReview;
    const hasNumber = getValue(input, 'context.Number') != undefined;
    const isCollectivePolicy = input.context.ConfigurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy;
    const createdFromPolicy = getValue(input, 'context.Body.technicalInformation.createdFromPolicy');
    const amendmentType = input.context.Dimensions.amendmentType;

    return createdFromPolicy ||
    amendmentType === changeAmendmentTypes.nonFinancialChange ||
    amendmentType === changeAmendmentTypes.financialChange ||
    isOnReview ||
    (isCollectivePolicy && hasNumber);

};
