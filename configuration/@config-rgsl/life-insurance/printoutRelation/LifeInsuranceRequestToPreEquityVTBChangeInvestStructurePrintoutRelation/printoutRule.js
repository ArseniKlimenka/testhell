'use strict';

const { investmentParametersEditClassTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function rule(input) {

    const changeClass = input.body.changeClass ?? [];
    const isInvestmentParametersEdit = checkAvailabilitySome(investmentParametersEditClassTypes, changeClass);

    if (isInvestmentParametersEdit) {
        return true;
    }
};
