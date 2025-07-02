const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enablePartner(input) {

    if (!isSaveOperationAvailable(this.view) || shouldDisableSaveableContract(input, this.view)) {

        return false;
    }

    const hasNumber = getValue(input, 'context.Number') != undefined;
    const isCollectivePolicy = input.context.ConfigurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy;

    const amendmentType = input.context.Dimensions.amendmentType;

    return getValue(input, 'context.Body.technicalInformation.isCreatedByOperations') &&
    amendmentType !== changeAmendmentTypes.nonFinancialChange &&
    amendmentType !== changeAmendmentTypes.financialChange &&
    !(hasNumber && isCollectivePolicy) ||
    amendmentType === changeAmendmentTypes.portfolioMovement;

};
