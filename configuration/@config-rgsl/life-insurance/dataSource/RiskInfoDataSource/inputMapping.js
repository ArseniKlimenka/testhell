'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.productCode = null;

    if (!input.data) {

        return output;
    }

    const criteria = input.data.criteria;

    if (criteria) {

        if (criteria.riskCodes && criteria.riskCodes.length > 0) {

            output.parameters.riskCodes = criteria.riskCodes;
        }

        output.parameters.selectBeneficiariesRisksOnly = criteria.selectBeneficiariesRisksOnly;
        output.parameters.selectEndowmentRisksOnly = criteria.selectEndowmentRisksOnly;
    }

    return output;
};
