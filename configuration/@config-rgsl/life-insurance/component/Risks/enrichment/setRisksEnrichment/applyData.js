const riskUtils = require('@config-rgsl/life-insurance/lib/riskUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { isNoteProduct } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse && dataSourceResponse.data && dataSourceResponse.data.length == 0) { return; }

    const body = this.businessContext.rootData;
    const dimensions = this.businessContext.configurationDimensions;
    const amendmentType = dimensions.amendmentType;

    const isPolicyCreating = getValue(this, 'businessContext.relationName', 'nothing') == 'CreatePolicy';
    const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
    const isNotePolicyCreating = isPolicyCreating && isNoteProduct(productCode);

    if (amendmentType === changeAmendmentTypes.financialChange) {

        riskUtils.processRiskPackages(body, dataSourceResponse.data, amendmentType);
    }

    if (isNotePolicyCreating || amendmentType === changeAmendmentTypes.financialChange) {

        riskUtils.updateRisksTerm(body, dataSourceResponse.data, amendmentType, isNotePolicyCreating);
    }
    else {

        riskUtils.setRisks(body, dataSourceResponse.data);
    }
};
