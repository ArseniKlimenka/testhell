'use strict';

const { finChangeTypes, nonFinChangeTypes, changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { policyChangeAmendmentRules } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentRules');

module.exports = function filterChangeTypes(input) {

    const currentItems = input.items;
    const amendmentType = input.context.Dimensions.amendmentType;
    let result = amendmentType === changeAmendmentTypes.financialChange ?
        getFinancialChanes(currentItems) :
        getNonFinancialChanes(currentItems);

    const productCode = input.context.Body.mainInsuranceConditions.insuranceProduct.productCode;
    const ruleConf = policyChangeAmendmentRules({ productCode: productCode });

    if (ruleConf) {

        result = result.filter(item => ruleConf[item]);
    }

    return result;
};

function getFinancialChanes(items) {

    return items.filter(item => finChangeTypes.includes(item));
}

function getNonFinancialChanes(items) {

    return items.filter(item => nonFinChangeTypes.includes(item));
}
