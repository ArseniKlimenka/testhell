'use strict';

module.exports = function searchDocumentApplyFunction(input, output) {

    const commRules = input.body.commissionRules || [];

    output.isPersonalBusiness = input.body.mainAttributes.isPersonalBusiness ?? false;
    output.attributes.additionalAttributes.vatRates = input.body.additionalAttributes.vatRates || [];

    output.commissionRules = commRules.map(rule => {

        const result = {
            ruleNum: rule.ruleNum
        };

        const insuranceProduct = rule.insuranceProduct;

        if (insuranceProduct && insuranceProduct.values?.length > 0) {

            result.insuranceProduct = {
                values: insuranceProduct.values,
                isInverted: insuranceProduct.isInverted
            };
        }

        return result;
    });
};
